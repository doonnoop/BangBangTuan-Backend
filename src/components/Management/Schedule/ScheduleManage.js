/**
 * Created by peng on 2019/8/13.
 */
import React from 'react';
import { Table, Button, Row, Col, Card } from 'antd';
import {deleteSchedule, getAllSchedule} from '../../../axios';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import CreateScheduleForm from "./CreateScheduleForm";

class ScheduleManage extends React.Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        schedules: []
    };
    componentDidMount() {
        this.start();
    }
    start = () => {
        this.setState({ loading: true });
        getAllSchedule().then((res) => {
            console.log(res)
            this.setState({
                schedules: res.data.records,
                loading:false
            });
        });
    };

    deleteProjectTask = (id) => {
        console.log(id);
        deleteSchedule(id).then((res) => {
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
            title: '开团时间',
            dataIndex: 'openingTime',
            width: 80,
        }, {
            title: '路由',
            dataIndex: 'route',
            width: 80
        },{
            title: '标题',
            dataIndex: 'title',
            width: 80
        }, {
            title: 'Action',
            key: 'action',
            width: 80,
            render: (text, record) => (
                <span>
                <Button onClick={() => {this.deleteStudyPath(record.id)}}>删除</Button>
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
                <BreadcrumbCustom first="管理" second="日程管理" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="日程管理表格" bordered={false}>
                                <div style={{ marginBottom: 16 }}>
                                    <Button type="primary" onClick={this.start}
                                            disabled={loading} loading={loading}
                                    >Reload</Button>
                                    <span style={{ marginLeft: 8 }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
                                    <CreateScheduleForm start={this.start} id={this.props.match.params.id} />
                                </div>
                                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.schedules} rowKey="id" />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ScheduleManage;
