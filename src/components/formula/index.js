import React, { Component } from 'react';
import { findDomNode } from 'react-dom';
import codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import { Menu } from 'antd';
import './index.less';

/*
  {
    prefix: [{
      type: '@',
      list: [{
        name: '变量',
        value: 'ver',
        inputName: '变量()'
      }]
    }, {
      type: '@',
      list: [{
        name: '求平均值',
        value: 'avg',
        inputName: '求平均值()'
      }]
    }],
    config: {
      readOnly: false,
      lineNumbers: true
    }
  }
*/

const defaultConfig = {
    readOnly: false,
    lineNumbers: true,
};

const defineMode = function(prefix) {
    codemirror.defineMode('defineScript', function() {
        var e = ['>=', '<=', '!=', '=', '>', '<', '+', '-', '*', '/', '(', ')', ';', ',', ':', '{', '}'];
        return {
            token: function(t) {
                if (t.eatSpace()) return null;

                if (t.match('//')) return t.skipToEnd(), 'comment';

                for (var n = 0; n < e.length; n++) if (t.match(e[n])) return 'mark-keyword';

                if (t.match('true') || t.match('false')) return 'boolean-keyword';

                for (let i = 0; i < prefix.length; i++) {
                    const list = prefix[i].list;
                    for (let j = 0; j < list.length; j++) {
                        if (t.match(list[j].name)) {
                            return `${prefix[i].class}-keyword`;
                        }
                    }
                    if (t.match(prefix[i].type)) return `${prefix[i].class}-keyword`;
                }

                if (t.match(/^[0-9\.+-]/, !1)) {
                    if (t.match(/^[+-]?0x[0-9a-fA-F]+/)) return 'number';
                    if (t.match(/^[+-]?\d*\.\d+([EeDd][+-]?\d+)?/)) return 'number';
                    if (t.match(/^[+-]?\d+([EeDd][+-]?\d+)?/)) return 'number';
                }

                if (t.match(/^"([^"]|(""))*"/)) return 'string';

                if (t.match(/^'([^']|(''))*'/)) return 'string';

                t.next();
                return 'nomal-keyword';
            },
        };
    });
};

export default class Formula extends Component {
    constructor(props) {
        super(props);
        this.state = {
            left: 0,
            top: 0,
            keyword: '',
            suggestions: [],
            selectedIndex: 0,
            showTip: false,
        };
        this.editBox = null;
        this.randomId = parseInt(Math.random() * 10000);
        this.sto = null;
    }

    componentDidMount() {
        const { prefix, value, config } = this.props;
        defineMode(prefix);
        this.editBox = codemirror.fromTextArea(
            document.getElementById(`fb_${this.randomId}`),
            Object.assign(
                {
                    mode: 'defineScript',
                    lineNumbers: true,
                    matchBrackets: true,
                    readOnly: false,
                    Autofocus: true,
                },
                config
            )
        );
        this.editBox.setValue(value || '');
        this.bindEvent();
    }

    // componentWillReceiveProps(nextProps) {
    //   if (nextProps.prefix != this.props.prefix) {
    //     defineMode(nextProps.prefix);
    //   }
    //   this.editBox.setValue(nextProps.value || '');
    // }

    hiddenTip = () => {
        this.setState({
            showTip: false,
        });
    };

    bindEvent = () => {
        const self = this;
        self.editBox.on('change', e => {
            self.props.onChange && self.props.onChange(e.getValue());
        });
        self.editBox.on('cursorActivity', self.cursorActivity);

        self.editBox.on('blur', () => {
            self.sto = setTimeout(() => {
                self.hiddenTip();
            }, 150);
        });

        self.editBox.on('focus', () => {
            clearTimeout(self.sto);
            self.cursorActivity();
        });

        self.editBox.addKeyMap({
            Enter: function(e) {
                const { suggestions, selectedIndex, showTip } = self.state;
                if (showTip && suggestions.length > 0 && suggestions[selectedIndex]) {
                    self.itemClick(suggestions[selectedIndex]);
                } else {
                    self.editBox.execCommand('newlineAndIndent');
                }
            },
        });
        document.body.addEventListener('keydown', this.keydown, true);
    };

    keydown = e => {
        if (this.state.showTip && [38, 40].includes(e.keyCode)) {
            e.stopPropagation();
            const { suggestions, selectedIndex } = this.state;
            if (e.keyCode == 40) {
                let index = selectedIndex + 1;
                if (index >= suggestions.length) {
                    index = 0;
                }
                this.setState({
                    selectedIndex: index,
                });
            } else if (e.keyCode == 38) {
                let index = selectedIndex - 1;
                if (index < 0) {
                    index = suggestions.length - 1;
                }
                this.setState({
                    selectedIndex: index,
                });
            }
        }
    };

    cursorActivity = () => {
        const { prefix } = this.props;
        const cursor = this.editBox.getCursor(), // 获取光标
            coords = this.editBox.cursorCoords(cursor, 'local'), // 获取光标定位
            lineText = this.editBox.getLine(cursor.line), // 获取当前行的内容
            str = lineText.substring(0, cursor.ch); // 获取当前光标前字符串
        let index = -1,
            suggestions = [];
        for (let i = 0; i < prefix.length; i++) {
            const ind = str.lastIndexOf(prefix[i].type);
            if (ind >= index) {
                index = ind;
                suggestions = prefix[i].list;
            }
        }

        if (index == -1) {
            this.hiddenTip();
            return;
        }

        const lastPrefix = str[index],
            searchStr = lineText.substring(index + 1, cursor.ch);

        const filterSuggestions = suggestions.filter(s => s.name.includes(searchStr) && s.name != searchStr);
        if (filterSuggestions.length <= 0) {
            this.hiddenTip();
            return;
        }
        this.setState({
            left: coords.left,
            top: coords.top,
            suggestions: filterSuggestions,
            selectedIndex: 0,
            keyword: lastPrefix,
            showTip: true,
        });
    };

    itemClick = sug => {
        const { keyword } = this.state;
        const cursor = this.editBox.getCursor(),
            lineText = this.editBox.getLine(cursor.line),
            str = lineText.substring(0, cursor.ch),
            lastIndex = str.lastIndexOf(keyword);

        this.editBox.setSelection(
            {
                line: cursor.line,
                ch: lastIndex + 1,
            },
            {
                line: cursor.line,
                ch: cursor.ch,
            }
        ),
            this.editBox.replaceSelection(sug.inputName);
        this.editBox.setCursor(cursor.line, lastIndex + 1 + sug.inputName.length);
        this.editBox.focus();

        this.hiddenTip();
    };

    render() {
        const { className = '', style = {}, config = {} } = this.props;
        const { showTip, suggestions, left, top, selectedIndex } = this.state;
        const assignConfig = Object.assign({}, defaultConfig, config);
        const selectedKeys = [];
        if (suggestions.length > 0 && suggestions[selectedIndex]) {
            selectedKeys.push(suggestions[selectedIndex].value);
        }

        return (
            <div className={`formula ${className}`} style={style}>
                <textarea className="formula-box" id={`fb_${this.randomId}`} />
                <div
                    className="formula-tip"
                    style={{
                        display: showTip ? 'block' : 'none',
                        top: top + 20,
                        left: assignConfig.lineNumbers ? 29 + left : left,
                    }}
                >
                    <Menu selectedKeys={selectedKeys}>
                        {suggestions.map(sug => (
                            <Menu.Item
                                key={sug.value}
                                onClick={() => {
                                    this.itemClick(sug);
                                }}
                            >
                                {sug.name}
                            </Menu.Item>
                        ))}
                    </Menu>
                </div>
            </div>
        );
    }

    componentWillUnmount() {
        this.editBox.off('change');
        this.editBox.off('cursorActivity');
        this.editBox.off('blur');
        this.editBox.off('focus');
        document.body.removeEventListener('keydown', this.keydown);
    }
}
