import React from 'react';
import {Layout, Card, Badge, Modal, Checkbox, Input, Row, Col} from 'antd';
import moment from 'moment';
import {AgentActions, AgentStore} from './reflux';

import './agent.less';

const {Header, Footer, Sider, Content} = Layout;

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

    render() {
        return (<Layout className="agent">
            <Content>
                {
                    this.state.agents.map((agent, index) => {
                        return <Card key={agent._id}
                                     title={<div><Badge status="success"/> &nbsp;{agent.ip}&nbsp; / &nbsp;[{agent.agentid}]</div>}
                                     extra={<a href="#">More</a>}>
                                {
                                    agent.instances.map((instance, index)=>{
                                        var badge = null;
                                        if(instance.state === -1)badge=<Badge status="default" />;
                                        if(instance.state === 0)badge=<Badge status="success" />;
                                        if(instance.state === 1)badge=<Badge status="warning" />;
                                        if(instance.state === 2)badge=<Badge status="error" />;

                                        return (<Card key={instance._id}
                                                      title={<div>{badge} &nbsp;{instance.package}</div>}
                                                      className="service">
                                            <div>{instance.time}</div>
                                            <hr />
                                            <div>{instance.instanceid}</div>
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