/**
 * Created by peng on 2019/7/29.
 */
import React from 'react';
import { Table, Button, Row, Col, Card } from 'antd';
import {deleteProjectTask, getAllProjectTasks} from '../../axios/index';
import BreadcrumbCustom from '../BreadcrumbCustom';
import CreateMissionForm from "./createMissionForm";

class MissionManage extends React.Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        tasks: []
    };
    componentDidMount() {
        console.log(this.props.match.params.id);
        this.start();
    }
    start = () => {
        this.setState({ loading: true });
        getAllProjectTasks(this.props.match.params.id).then((res) => {
            console.log(res)
            this.setState({
                tasks: res.data,
                loading:false
            });
        });
    };

    deleteProjectTask = (id) => {
        console.log(id);
        deleteProjectTask(id).then((res) => {
            console.log(res);
            this.start();
        });
    };

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    return = () => {
        this.props.history.push('/app/dashboard/projects')
    };
    render() {
        const columns = [{
            title: 'ID',
            dataIndex: 'id',
            width: 80
        },{
            title: '任务名称',
            dataIndex: 'name',
            width: 80,
            render: (text, record) => {
                return <a href={record.url} target="_blank" rel="noopener noreferrer">{text}</a>
            }
        }, {
            title: '详情',
            dataIndex: 'details',
            width: 80
        },{
            title: '状态',
            dataIndex: 'status',
            width: 80
        },{
            title: '创建时间',
            dataIndex: 'createTime',
            width: 80
        },{
            title: 'Action',
            key: 'action',
            width: 80,
            render: (text, record) => (
                <span>
                <Button onClick={() => {this.deleteProjectTask(record.id)}}>删除</Button>
            </span>
            ),
        }];
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="管理" second="项目管理" third="任务管理"/>
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="任务管理表格" bordered={false}>
                                <div style={{ marginBottom: 16 }}>
                                    <Button type="primary" onClick={this.start}
                                            disabled={loading} loading={loading}
                                    >Reload</Button>
                                    <span style={{ marginLeft: 8 }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
                                    <CreateMissionForm start={this.start} id={this.props.match.params.id} />
                                </div>
                                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.tasks} rowKey="id" />
                                <Button type="primary" style={{ marginTop: 10 }} onClick={this.return}>返回</Button>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default MissionManage;
