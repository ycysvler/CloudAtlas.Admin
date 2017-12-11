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
import {Job} from '../job/job';
import {ConstantlyLog} from '../log/constantly';
import {ConstantlyAgent} from '../agent/constantly';
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
                        src="http://huyaimg.dwstatic.com/avatar/1013/a7/ab3ed96f348eaf2b1537411c56f512_180_135.jpg?412550"/>
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
        return (<Layout className="main">
                <Header className="header">
                    <Menu mode="horizontal" style={{borderBottom: 'none'}} onClick={this.handleClick}>
                        <SubMenu key="job" title={<span><Icon type="appstore-o"/><span>搜索任务</span></span>} >
                            <Menu.Item key="redis"><Link to="/main/job/redis" >任务查询</Link></Menu.Item>

                        </SubMenu>
                        <SubMenu key="log" title={<span><Icon type="appstore-o"/><span>日志中心</span></span>} >
                            <Menu.Item key="constantly"><Link to="/main/log/constantly" >实时日志</Link></Menu.Item>
                            <Menu.Item key="history"><Link to="/main/log/history" >历史日志</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu title={<span><Icon type="eye-o"/><span>监控中心</span></span>} key="monitor">
                            <Menu.Item key="agent"><Link to="/main/agent/constantly" >Agent 状态</Link></Menu.Item>
                            <Menu.Item key="m2">系统监控2</Menu.Item>
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
                    </Menu>
                    <Popover placement="bottomRight" trigger="click" content={this.avatarMenu}>
                        <div id="avatar">
                            <Avatar size="large"
                                    src="http://huyaimg.dwstatic.com/avatar/1013/a7/ab3ed96f348eaf2b1537411c56f512_180_135.jpg?412550"/>
                        </div>
                    </Popover>
                </Header>
                    <Layout >
                        <Router>
                            <Switch>
                                <Route strict path="/main/system" component={System}/>
                                <Route  path="/main/log/constantly" component={ConstantlyLog}/>
                                <Route  path="/main/log/history" component={HistoryLog}/>
                                <Route  path="/main/agent/constantly" component={ConstantlyAgent}/>
                                <Route  path="/main/job/redis" component={Job}/>
                                <Route component={NotFound}/>
                            </Switch>
                        </Router>
                    </Layout>

            </Layout>
        );
    }
}