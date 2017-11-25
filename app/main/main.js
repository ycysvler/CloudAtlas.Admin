/**
 * Created by yanggang on 2017/3/6.
 */
import React from 'react';
import {HashRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import {Layout, Menu, Icon, Avatar, Popover, Button} from 'antd';
const {Header, Footer, Sider, Content} = Layout;

const SubMenu = Menu.SubMenu;

import {System} from '../system/system';
import {HistoryLog} from '../log/history';
import {ConstantlyLog} from '../log/constantly';
import {NotFound} from '../notfound';

import './main.less';

export class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    avatarMenu = (<div className="avatar-menu">
        <div className="info">
            <div className="left">
                <Avatar size="large" style={{height:80,width:80,borderRadius:40,margin:'8px 24px 8px 8px'}}
                        src="http://g.hiphotos.baidu.com/image/pic/item/5bafa40f4bfbfbed956ea89572f0f736afc31f20.jpg"/>
            </div>
            <div className="right">
                <div>管理员</div>
                <div>zhanghongqing@seeobject.com</div>
                <div><Button size="small" type="primary">个人信息</Button></div>
            </div>
        </div>
        <div className="toolbar"><Button>注  销</Button></div>
    </div>)

    render() {
        console.log(this.props);
        return (<Layout className="main">
                <Header className="header">
                    <Menu mode="horizontal" style={{borderBottom: 'none'}} onClick={this.handleClick}>
                        <SubMenu key="log" title={<span><Icon type="appstore-o"/><span>日志中心</span></span>} >
                            <Menu.Item key="constantly"><Link to="/main/log/constantly" >实时日志</Link></Menu.Item>
                            <Menu.Item key="history"><Link to="/main/log/history" >历史日志</Link></Menu.Item>
                        </SubMenu>

                        <Menu.Item key="config" style={{height: 64, lineHeight: '64px'}}>
                            <Icon type="setting"/>基本配置
                        </Menu.Item>
                        <SubMenu title={<span><Icon type="appstore-o"/><span>数据管理</span></span>} key="data">
                            <Menu.Item key="user">用户</Menu.Item>
                            <Menu.Item key="ip">IP白名单</Menu.Item>
                            <Menu.Item key="type">图片类型</Menu.Item>
                            <Menu.Item key="image">图片信息</Menu.Item>
                        </SubMenu>
                        <SubMenu title={<span><Icon type="line-chart"/><span>统计分析</span></span>} key="statistics">
                            <Menu.Item key="s1">统计分析1</Menu.Item>
                            <Menu.Item key="s2">统计分析2</Menu.Item>
                        </SubMenu>
                        <SubMenu title={<span><Icon type="eye-o"/><span>系统监控</span></span>} key="monitor">
                            <Menu.Item key="m1">系统监控1</Menu.Item>
                            <Menu.Item key="m2">系统监控2</Menu.Item>
                        </SubMenu>
                    </Menu>
                    <Popover placement="bottomRight" trigger="click" content={this.avatarMenu}>
                        <div id="avatar">
                            <Avatar size="large"
                                    src="http://g.hiphotos.baidu.com/image/pic/item/5bafa40f4bfbfbed956ea89572f0f736afc31f20.jpg"/>
                        </div>
                    </Popover>
                </Header>


                    <Layout >
                        <Router>
                            <Switch>
                                <Route strict path="/main/system" component={System}/>
                                <Route  path="/main/log/constantly" component={ConstantlyLog}/>
                                <Route  path="/main/log/history" component={HistoryLog}/>

                                <Route component={NotFound}/>
                            </Switch>
                        </Router>
                    </Layout>

            </Layout>
        );
    }
}