/**
 * Created by yanggang on 2017/3/6.
 */
import React from 'react';
import {Layout, Table, Badge, Modal, Checkbox, Input, Row, Col} from 'antd';
import moment from 'moment';
import {LogActions, LogStore} from './reflux';

const {Header, Footer, Sider, Content} = Layout;

export class ConstantlyLog extends React.Component {
    constructor(props) {
        super(props);

        this.unsubscribe = LogStore.listen(this.onStatusChange.bind(this));

        this.state = {
            logs: [], current: {}, visible: false,
            columnFilter: {title: '', time: '', entid: '', intance: '', service: '', interface: ''},
            columnConfig: {
                entid: true, time: true, level: true, intance: true, service: true,
                interface: true, title: true, content: true
            }
        };

        LogActions.constantly();
    }

    onStatusChange(action, data) {
        if (action === "constantly") {
            var logs = this.state.logs;
            // 太多了，清一清
            if (logs.length > 200) {
                logs = [];
            }
            // 合并新数据进来
            logs = data.concat(logs);
            // 更新界面
            this.setState({logs: logs});
            // 再去要一下数据试试
            LogActions.constantly();
        }
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onRowClick = (record, index, event) => {
        this.setState({current: record, visible: true});
    }
    handleCancel = (e) => {
        this.setState({visible: false});
    }

    onCheckChange = (e) => {
        var checked = e.target.checked;
        var value = e.target.value;

        var columnConfig = this.state.columnConfig;
        columnConfig[value] = checked;

        this.setState({columnConfig: columnConfig});
    }

    onQueryChange = (e) => {
        var value = e.target.value;
        var id = e.target.id;

        var columnFilter = this.state.columnFilter;
        columnFilter[id] = value;

        this.setState({columnFilter: columnFilter});
    }

    getColumn = () => {
        var columns = [];

        if (this.state.columnConfig.level) {
            columns.push({
                title: 'level', dataIndex: 'level', key: 'level', width: 90,
                render: function (text, record, index) {
                    if (record.level === 'DEBUG') {
                        return <div style={{paddingLeft: 8}}><Badge status="processing"/> <span>{text}</span></div>
                    }
                    if (record.level === 'INFO') {
                        return <div style={{paddingLeft: 8}}><Badge status="default"/><span>{text}</span></div>
                    }
                    if (record.level === 'WARN') {
                        return <div style={{paddingLeft: 8}}><Badge status="warning"/><span>{text}</span></div>
                    }
                    if (record.level === 'ERROR') {
                        return <div style={{paddingLeft: 8}}><Badge status="error"/><span>{text}</span></div>
                    }
                    if (record.level === 'FATAL') {
                        return <div style={{paddingLeft: 8}}><Badge status="error"/><span>{text}</span></div>
                    }
                }
            });
        }

        if (this.state.columnConfig.service) {
            columns.push({
                title: 'service', dataIndex: 'service', key: 'service',

                filteredValue: [this.state.columnFilter.service],
                onFilter: (value, record) => record.service.indexOf(value) > -1,
            });
        }
        if (this.state.columnConfig.title) {
            columns.push({
                title: 'title', dataIndex: 'title', key: 'title',

                filteredValue: [this.state.columnFilter.title],
                onFilter: (value, record) => record.title.indexOf(value) > -1,
            });
        }
        if (this.state.columnConfig.interface) {
            columns.push({
                title: 'interface', dataIndex: 'interface', key: 'interface',

                filteredValue: [this.state.columnFilter.interface],
                onFilter: (value, record) => record.interface.indexOf(value) > -1,
            });
        }

        if (this.state.columnConfig.entid) {
            columns.push({
                title: 'entId', dataIndex: 'entid', key: 'entid',

                filteredValue: [this.state.columnFilter.entid],
                onFilter: (value, record) => record.entid.indexOf(value) > -1,
            });
        }

        if (this.state.columnConfig.intance) {
            columns.push({
                title: 'intance', dataIndex: 'intance', key: 'intance',

                filteredValue: [this.state.columnFilter.intance],
                onFilter: (value, record) => record.intance.indexOf(value) > -1,
            });
        }

        if (this.state.columnConfig.time) {
            columns.push({
                title: 'time', dataIndex: 'time', key: 'time', width: 140,

                filteredValue: [this.state.columnFilter.time],
                onFilter: (value, record) => record.time.indexOf(value) > -1,
                render: function (text, record, index) {
                    return <div>{new moment(record.time).format('YYYY-MM-DD HH:mm:ss')}</div>
                }
            });
        }

        return columns;
    }

    render() {
        return (
            <Layout>
                <Header style={{"background": "#fff", height: 'auto'}}>
                    <div>
                        <Row>
                            <Col span={2}><span>字段选择：</span></Col>
                            <Col span={22}><Checkbox value="level" checked={this.state.columnConfig.level}
                                                     onChange={this.onCheckChange}>level</Checkbox>
                                <Checkbox value="service" checked={this.state.columnConfig.service}
                                          onChange={this.onCheckChange}>service</Checkbox>
                                <Checkbox value="title" checked={this.state.columnConfig.title}
                                          onChange={this.onCheckChange}>title</Checkbox>
                                <Checkbox value="interface" checked={this.state.columnConfig.interface}
                                          onChange={this.onCheckChange}>interface</Checkbox>
                                <Checkbox value="entid" checked={this.state.columnConfig.entid}
                                          onChange={this.onCheckChange}>entid</Checkbox>
                                <Checkbox value="intance" checked={this.state.columnConfig.intance}
                                          onChange={this.onCheckChange}>intance</Checkbox>
                                <Checkbox value="time" checked={this.state.columnConfig.time}
                                          onChange={this.onCheckChange}>time</Checkbox>
                            </Col>
                        </Row>
                        <div>
                            <div className="gutter-example">
                                <Row gutter={16}>
                                    <Col span={2}>
                                        <div >Time:</div>
                                    </Col><Col span={6}><Input id="time" onChange={this.onQueryChange}
                                                               value={this.state.columnFilter.time}
                                                               placeholder="输入Time的关键字"/></Col>
                                    <Col span={2}>
                                        <div >Title:</div>
                                    </Col><Col span={6}><Input id="title" onChange={this.onQueryChange}
                                                               value={this.state.columnFilter.title}
                                                               placeholder="输入Title的关键字"/></Col>
                                    <Col span={2}>
                                        <div >Entid:</div>
                                    </Col><Col span={6}><Input id="entid" onChange={this.onQueryChange}
                                                               value={this.state.columnFilter.entid}
                                                               placeholder="输入Entid的关键字"/></Col>
                                </Row>
                            </div>
                            <div className="gutter-example">
                                <Row gutter={16}>
                                    <Col span={2}>
                                        <div >Intance:</div>
                                    </Col><Col span={6}><Input id="intance" onChange={this.onQueryChange}
                                                               value={this.state.columnFilter.intance}
                                                               placeholder="输入Intance的关键字"/></Col>
                                    <Col span={2}>
                                        <div >Service:</div>
                                    </Col><Col span={6}><Input id="service" onChange={this.onQueryChange}
                                                               value={this.state.columnFilter.service}
                                                               placeholder="输入Service的关键字"/></Col>
                                    <Col span={2}>
                                        <div >Interface:</div>
                                    </Col><Col span={6}><Input id="interface" onChange={this.onQueryChange}
                                                               value={this.state.columnFilter.interface}
                                                               placeholder="输入Interface的关键字"/> </Col>
                                </Row>
                            </div>
                        </div>

                    </div>
                </Header>

                <Layout className="monitor" style={{padding: '16px'}}>

                    <Content style={{"background": "#fff"}}>
                        <Table pagination={false} rowKey="index"
                               onRowClick={this.onRowClick}
                               bordered={true}
                               dataSource={this.state.logs} columns={this.getColumn()}/>
                    </Content>

                    <Modal
                        width={1000}
                        footer={null}
                        onCancel={this.handleCancel}
                        title={this.state.current.title}
                        visible={this.state.visible}
                    >
                        <table className="dialog_table">
                            <tbody>
                            <tr>
                                <td style={{width: 100}}>time</td>
                                <td>{this.state.current.time}</td>
                            </tr>
                            <tr>
                                <td>level</td>
                                <td>{this.state.current.level}</td>
                            </tr>
                            <tr>
                                <td>entid</td>
                                <td>{this.state.current.entid}</td>
                            </tr>
                            <tr>
                                <td>service</td>
                                <td>{this.state.current.service}</td>
                            </tr>
                            <tr>
                                <td>interface</td>
                                <td>{this.state.current.interface}</td>
                            </tr>
                            <tr>
                                <td>content</td>
                                <td>{this.state.current.content}</td>
                            </tr>
                            </tbody>
                        </table>
                    </Modal>
                </Layout>
            </Layout>
        );
    }
}