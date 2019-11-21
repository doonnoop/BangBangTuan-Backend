/**
 * Created by Taryn on 2019/11/05.
 */
import React from 'react';
import {Table, Button, Row, Col, Card } from 'antd';
import { getClocks, deleteClock } from '../../../axios';
import BreadcrumbCustom from '../../BreadcrumbCustom';

class ClockManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clocks: [],
            selectedRowKeys: [],
            loading: false,
        };
    }

    componentDidMount() {
        this.start();
    }
    start = () => {
        this.setState({ loading: true });
        getClocks().then((res) => {
            console.log(res)
            this.setState({
                clocks: res.data.records,
                loading:false
            });
        });
    };
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    deleteClock = (id) => {
        console.log(id);
        deleteClock(id).then((res) => {
            console.log(res);
            this.start();
        });
    };

    render() {
        const columns = [{
            title: 'ID',
            dataIndex: 'id',
            width: 80
        },{
            title: 'userId',
            dataIndex: 'userId',
            width: 80,
        }, {
            title: '内容',
            dataIndex: 'content',
            width: 80
        }, {
            title: '用户名称',
            dataIndex: 'name',
            width: 80
        }, {
            title: '创建时间',
            dataIndex: 'createTime',
            width: 80
        }, {
            title: 'Action',
            key: 'action',
            width: 80,
            render: (text, record) => (
                <span>
                <Button onClick={() => {this.deleteClock(record.id)}}>删除</Button>
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
                <BreadcrumbCustom first="管理" second="打卡管理" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="打卡表格" bordered={false}>
                                <div style={{ marginBottom: 16 }}>
                                    <Button type="primary" onClick={this.start}
                                            disabled={loading} loading={loading}
                                    >Reload</Button>
                                    <span style={{ marginLeft: 8 }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
                                </div>
                                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.clocks} rowKey="id" scroll={{ x: 1300 }} />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ClockManage;
