import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon, Breadcrumb, Avatar } from "antd"
import { withRouter } from 'react-router'
import { inject, observer } from "mobx-react";
import _ from "lodash";
import Router from "./router"

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

@withRouter
@inject('appStore')
@observer
export default class App extends Component {
  state = {
    collapsed: false,
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  renderMenu = item => {
    if (item.link) {
      return <Menu.Item key={item.key}>
        <Link to={item.link}>
          {item.icon && <Icon type={item.icon} />}
          <span>{item.label}</span>
        </Link>
      </Menu.Item>
    } else {
      return <SubMenu key={item.key} title={<span>{item.icon && <Icon type={item.icon} />}<span>{item.label}</span></span>}>
        {
          item.children && item.children.map(this.renderMenu)
        }
      </SubMenu>
    }
  }

  render() {
    const { menus } = this.props.appStore;
    return <Layout>
      <Sider 
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
      >
        <h1 className="logo">后台管理</h1>
        <Menu
          defaultSelectedKeys={[]}
          defaultOpenKeys={[]}
          mode="inline"
          theme="dark"
        >
          {
            menus.map(this.renderMenu)
          }
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <div className="fr" style={{marginRight: 20}}>
            <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
          </div>
          <Icon
            className="trigger"
            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggleCollapsed}
          />
        </Header>
        <Content style={{
            margin: '15px 16px 0'
          }}>
          { this.renderBreadcrumb() }
          <div className="inner" style={{
            padding: 24, background: '#fff', minHeight: 280, marginTop: 15
          }}>
            <Router />
          </div>
        </Content>
      </Layout>
    </Layout>
  }

  renderBreadcrumb = () => {
    const { menus } = this.props.appStore;
    const pathname = this.props.location.pathname;
    const find = this.findUrl(menus, pathname);
    if (find.length <= 0) {
      return null
    }
    return (
      <Breadcrumb>
        {
          find.map(item => <Breadcrumb.Item key={item.key}>
              {item.label}
            </Breadcrumb.Item>)
        }
      </Breadcrumb>
    )
  }

  findUrl = (arr, pathname) => {
    const find = _.find(arr, i => i.link == pathname);
    if (find) {
      return [find]
    } else {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].children) {
          const f = this.findUrl(arr[i].children, pathname);
          if (f.length > 0) {
            return [arr[i], ...f]
          } 
        }
      }
      return []
    }
  }
}