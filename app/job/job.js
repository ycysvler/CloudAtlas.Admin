/**
 * Created by yanggang on 2017/3/6.
 */
import React from 'react';
import {Layout, Table, Badge, Modal, Checkbox, Input, Row, Col, Select} from 'antd';
import moment from 'moment';
import {JobActions, JobStore} from './reflux';
import {JobResult} from './result';

const {Header, Footer, Sider, Content} = Layout;

export class Job extends React.Component {
    constructor(props) {
        super(props);

        this.unsubscribe = JobStore.listen(this.onStatusChange.bind(this));
        this.state = {enterprises: [], jobs: [], entid:'', current:{}};
        JobActions.enterprises();
    }

    onStatusChange(action, data) {
        if (action === "enterprises") {
            this.setState({enterprises: data});
        }
        if (action === "jobs") {
            this.setState({jobs: data});
        }
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onRowClick = (record, index, event) => {
        console.log(record);
        this.setState({current:record});
    }

    handleChange = (value) => {
        JobActions.jobs(value);
        this.setState({entid:value});
    }


    getColumn = () => {
        var columns = [];

        columns.push({
            title: 'id', dataIndex: '_id', key: '_id'
        });

        columns.push({
            title: 'createtime', dataIndex: 'createtime', key: 'createtime',
            render: function (text, record, index) {
                return <div>{new moment(record.createtime).format('YYYY-MM-DD HH:mm:ss')}</div>
            }
        });

        columns.push({
            title: 'images', dataIndex: 'images', key: 'images',
            render: function (text, record, index) {
                return <span>{record.images.join(' , ')}</span>
            }
        });
        columns.push({
            title: 'imagetypes', dataIndex: 'imagetypes', key: 'imagetypes',
            render: function (text, record, index) {
                return <span>{record.imagetypes.join(' , ')}</span>
            }
        });
        columns.push({
            title: 'featuretypes', dataIndex: 'featuretypes', key: 'featuretypes',
            render: function (text, record, index) {
                return <span>{record.featuretypes.join(' , ')}</span>
            }
        });

        columns.push({
            title: 'progress', dataIndex: 'progress', key: 'progress',
            render: function (text, record, index) {
                return <span>{record.progress * 100}%</span>
            }
        });

        return columns;
    }



    render() {
        return (
            <Layout>
                <Header style={{"background": "#fff", height: 'auto'}}>
                    <div>
                        <Select placeholder="Select a enterprese" style={{width: 250}} onChange={this.handleChange}>
                            {
                                this.state.enterprises.map(function (item, index) {
                                    return <Select.Option key={item._id}
                                                          value={item.entid}>{item.entname}</Select.Option>
                                })
                            }
                        </Select>
                    </div>

                </Header>

                <Layout className="monitor" style={{padding: '16px'}}>

                    <div style={{"background": "#fff", height: 'auto'}}>
                        <Table pagination={false} rowKey="_id"
                               onRowClick={this.onRowClick}
                               bordered={true}
                               dataSource={this.state.jobs} columns={this.getColumn()}/>

                    </div>
                    <Content style={{ marginTop:16}}>
                        <JobResult entid={this.state.entid} job={this.state.current} />
                    </Content>



                </Layout>
            </Layout>
        );
    }
}