import React, { Component } from "react";
import { findDomNode } from "react-dom";
import codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "./index.less";

const defaultConfig = {
    readOnly: false,
    lineNumbers: true,
};

export default class CodeInput extends Component {
    constructor(props) {
        super(props);
        this.editBox = null;
        this.randomId = parseInt(Math.random() * 10000);
    }

    componentDidMount() {
        const { readonly } = this.props;
        this.editBox = codemirror.fromTextArea(document.getElementById(`fb_${this.randomId}`), {
            mode: "application/json",
            lineNumbers: true,
            matchBrackets: true,
            readOnly: readonly || false,
            Autofocus: true,
        });
        if (this.props.value) {
            this.editBox.setValue(this.props.value);
        }
        this.bindEvent();
    }

    bindEvent = () => {
        const self = this;
        self.editBox.on("change", e => {
            self.props.onChange && self.props.onChange(e.getValue());
        });
    };

    render() {
        const { className = "", style = {}, config = {} } = this.props;

        return (
            <div className={`code-input ${className}`} style={style}>
                <textarea className="formula-box" id={`fb_${this.randomId}`} />
            </div>
        );
    }

    componentWillUnmount() {
        this.editBox.off("change");
    }
}
