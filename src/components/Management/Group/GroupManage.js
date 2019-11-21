/**
 * Created by Taryn on 2019/11/05.
 */
import React from 'react';
import {Table, Button, Row, Col, Card } from 'antd';
import { getGroups, deleteGroup } from '../../../axios';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import CreatGroupForm from './createGroupForm';

class GroupManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            selectedRowKeys: [],
            loading: false,
        };
    }

    componentDidMount() {
        this.start();
    }
    start = () => {
        this.setState({ loading: true });
        getGroups().then((res) => {
            console.log(res)
            this.setState({
                groups: res.data.records,
                loading:false
            });
        });
    };
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    deleteGroup = (id) => {
        console.log(id);
        deleteGroup(id).then((res) => {
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
            title: '自学团',
            dataIndex: 'title',
            width: 200,
            render: (text, record) => {
                return <div style={{display: "flex", flexDirection: 'row'}}>
                    <div style={{marginRight: 10}}><img alt="a" src={record.image} style={{width: 60, height: 60}} /></div>
                    <div>{text}</div>
                </div>
            }
        }, {
            title: '学习路径id',
            dataIndex: 'learningPathId',
            width: 80
        }, {
            title: '技术栈',
            dataIndex: 'technology',
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
                <Button onClick={() => {this.deleteGroup(record.id)}}>删除</Button>
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
                <BreadcrumbCustom first="管理" second="自学团管理" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="自学团表格" bordered={false}>
                                <div style={{ marginBottom: 16 }}>
                                    <Button type="primary" onClick={this.start}
                                            disabled={loading} loading={loading}
                                    >Reload</Button>
                                    <span style={{ marginLeft: 8 }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
                                    <CreatGroupForm start={this.start} />
                                </div>
                                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.groups} rowKey="id" scroll={{ x: 1300 }} />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default GroupManage;
