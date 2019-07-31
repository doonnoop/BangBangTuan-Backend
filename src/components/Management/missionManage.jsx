/**
 * Created by peng on 2019/7/29.
 */
import React from 'react';
import { Table, Button, Row, Col, Card } from 'antd';
import { getAllProjects } from '../../axios/index';
import BreadcrumbCustom from '../BreadcrumbCustom';
import CreateMissionForm from "./createMissionForm";
const columns = [{
    title: 'ID',
    dataIndex: 'id',
    width: 80
},{
    title: '项目名称',
    dataIndex: 'name',
    width: 80,
    render: (text, record) => {
        return <a href={record.url} target="_blank" rel="noopener noreferrer">{text}</a>
    }
}, {
    title: '技术',
    dataIndex: 'technology',
    width: 80
}, {
    title: '类型',
    dataIndex: 'type',
    width: 80
},{
    title: '状态',
    dataIndex: 'status',
    width: 80
},{
    title: '创建时间',
    dataIndex: 'createTime',
    width: 80
}];

class MissionManage extends React.Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        projects: []
    };
    componentDidMount() {
        console.log(this.props.match.params.id)
        this.start();
    }
    start = () => {
        this.setState({ loading: true });
        getAllProjects().then((res) => {
            console.log(res)
            this.setState({
                projects: res.data.records,
                loading:false
            });
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
                                    <CreateMissionForm />
                                </div>
                                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.projects} rowKey="id" />
                                <Button type="primary" onClick={this.return}>返回</Button>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default MissionManage;
