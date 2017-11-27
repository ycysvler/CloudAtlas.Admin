import React from 'react';
import {Layout, Card, Badge, Menu,Icon} from 'antd';
import moment from 'moment';
import {AgentActions, AgentStore} from './reflux';

import './agent.less';

const {Header, Footer, Sider, Content} = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export class ConstantlyAgent extends React.Component {
    constructor(props) {
        super(props);
        this.unsubscribe = AgentStore.listen(this.onStatusChange.bind(this));

        this.state = {agents: []};


        AgentActions.constantly();
    }

    onStatusChange(action, data) {
        if (action === "constantly") {
            console.log('data >', data);
            // 更新界面
            this.setState({agents: data});
            // 再去要一下数据试试
            setTimeout(() => {
                AgentActions.constantly();
            }, 5000);
        }
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    renderStateMenu=(state)=>{
        var self = this;
        //<h1>{JSON.stringify(state)}</h1>
        var propertys = Object.getOwnPropertyNames(state);
        console.log('p >',propertys);
        return (<Menu mode="vertical" style={{borderRight:'none'}}>
            <SubMenu key="root" title="业务状态数据">
            {
                propertys.map((item,index)=>{
                    return self.getMenuTree(item, state[item]);
                })
            }
            </SubMenu>
        </Menu>)
    }

    getMenuTree=(name, parent)=>{
        var self = this;
        var propertys = Object.getOwnPropertyNames(parent);

        if(typeof (parent) === 'object'){
            return <SubMenu key={name} title={name}>
                {
                    propertys.map((item,index)=>{
                        return self.getMenuTree(item, parent[item]);
                    })
                }
            </SubMenu>
        }else{
            var nameview = <b>{name}：</b>;
            var valueview = parent;

            return <Menu.Item key={name}>{nameview}{valueview}</Menu.Item>
        }
    }

    render() {
        let self = this;
        return (<Layout className="agent">
            <Content>
                {
                    this.state.agents.map((agent, index) => {
                        return <Card key={agent._id}
                                     title={<div><Badge status="success"/> &nbsp;{agent.ip}&nbsp; / &nbsp;{agent.agentid}</div>}
                                     extra={<a href="#">More</a>}>
                                {
                                    agent.instances.map((instance, index)=>{
                                        var badge = null;
                                        if(instance.badge === -1)badge=<Badge status="default" />;
                                        if(instance.badge === 0)badge=<Badge status="success" />;
                                        if(instance.badge === 1)badge=<Badge status="warning" />;
                                        if(instance.badge === 2)badge=<Badge status="error" />;

                                        return (<Card key={instance._id}
                                                      title={<div>{badge}&nbsp;{instance.package}</div>}
                                                      className="service">
                                            <div>{instance.instanceid}</div>
                                            <hr/>
                                            <div>{instance.time}</div>
                                            <hr/>
                                            <div>{self.renderStateMenu(instance.state)}</div>
                                            <hr/>
                                        </Card>);
                                    })
                                }
                        </Card>;
                    })
                }

            </Content>

        </Layout>);
    }
}