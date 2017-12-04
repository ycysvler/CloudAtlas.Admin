/**
 * Created by yanggang on 2017/3/6.
 */
import React from 'react';
import {Layout, Collapse, Menu,Card, Row, Col} from 'antd';
import moment from 'moment';
import {JobActions, JobStore} from './reflux';
import Config from 'config';

const {Header, Footer, Sider, Content} = Layout;

import './job.less';

export class JobResult extends React.Component {
    constructor(props) {
        super(props);
        this.unsubscribe = JobStore.listen(this.onStatusChange.bind(this));
        this.state = {job: props.job, entid: props.entid, results: []};
        //JobActions.enterprises();
    }

    componentWillReceiveProps(newProps, oldProps) {
        this.setState({job: newProps.job, entid: newProps.entid});
        return newProps.job;
    }

    onStatusChange(action, data) {
        if (action === "enterprises") {
            this.setState({enterprises: data});
        }
        if (action === "jobs") {
            this.setState({jobs: data});
        }
        if (action === "results") {
            this.setState({results: data});
        }
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    sourcesClick = (e) => {
        this.state.source = e.key;
        this.getResults();
    }

    imagetypesClick = (e) => {
        this.state.imagetype = e.key;
        this.getResults();
    }

    featuretypesClick = (e) => {
        this.state.featuretype = e.key;
        this.getResults();
    }

    getResults=()=> {
        if (this.state.source && this.state.imagetype && this.state.featuretype) {
            JobActions.results(this.state.entid, this.state.job._id, this.state.source, this.state.imagetype, this.state.featuretype);
        }
    }

    render() {
        var self = this;

        return (
            <Layout className="result" style={{"background": "#fff", height: 'auto'}}>
                <Content>
                    <Layout>
                        <Sider style={{"background": "transparent", height: 'auto'}} width={160}>
                            <Collapse bordered={true} defaultActiveKey={['sources', 'imagetypes', 'featuretypes']}>
                                <Collapse.Panel header="sources" key="sources">
                                    <Menu style={{width: 160}} onClick={this.sourcesClick}>
                                        {
                                            this.state.job.images ? this.state.job.images.map(
                                                    function (item, index) {
                                                        return <Menu.Item key={item} style={{height: 140}}>
                                                            <img className="img"
                                                                 src={Config.url + "/api/enterprises/" + self.state.entid + "/images/" + item}/>

                                                        </Menu.Item>
                                                    }
                                                ) : null
                                        }
                                    </Menu>
                                </Collapse.Panel>
                                <Collapse.Panel header="feature types" key="imagetypes">
                                    <Menu style={{width: 160}} onClick={this.imagetypesClick}>
                                        {
                                            this.state.job.imagetypes ? this.state.job.imagetypes.map(
                                                    function (item, index) {
                                                        return <Menu.Item key={item}><span> {item}</span></Menu.Item>
                                                    }
                                                ) : null
                                        }
                                    </Menu>
                                </Collapse.Panel>

                                <Collapse.Panel header="feature types" key="featuretypes">
                                    <Menu style={{width: 160}} onClick={this.featuretypesClick}>
                                        {
                                            this.state.job.featuretypes ? this.state.job.featuretypes.map(
                                                    function (item, index) {
                                                        return <Menu.Item key={item}>{item}</Menu.Item>
                                                    }
                                                ) : null
                                        }
                                    </Menu>
                                </Collapse.Panel>
                            </Collapse>
                        </Sider>
                        <Content>
                            {
                                this.state.results.map(function(item,index){
                                    return <Card key={item._id} title={item.score} style={{ width: 170,float:'left', margin:'0 0 4px 4px' }}> <img className="img"
                                                 src={Config.url + "/api/enterprises/" + self.state.entid + "/images/" + item.image}/></Card>
                                })
                            }
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        );
    }
}