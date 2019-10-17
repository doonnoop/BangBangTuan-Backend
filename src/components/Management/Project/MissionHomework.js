/**
 * Created by Taryn on 2019/10/15.
 */
import React from 'react';
import {Table, Button, Row, Col, Card } from 'antd';
import { getMissionHomeworks } from '../../../axios';
import BreadcrumbCustom from '../../BreadcrumbCustom';

class MissionHomework extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            homeWorks: [],
            selectedRowKeys: [],
            loading: false,
        };
    }

    componentDidMount() {
        this.start();
    }
    start = () => {
        this.setState({ loading: true });
        getMissionHomeworks().then((res) => {
            console.log(res)
            this.setState({
                homeWorks: res.data.records,
                loading:false
            });
        });
    };
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    render() {
        const columns = [{
            title: 'ID',
            dataIndex: 'id',
            width: 5
        },{
            title: 'projectTaskUserId',
            dataIndex: 'projectTaskUserId',
            width: 80,
        }, {
            title: '代码地址',
            dataIndex: 'codeAddress',
            width: 80
        }, {
            title: 'demo地址',
            dataIndex: 'demoAddress',
            width: 80
        }, {
            title: '创建时间',
            dataIndex: 'createTime',
            width: 80
        }, {
            title: 'userId',
            dataIndex: 'userId',
            width: 80
        }, {
            title: '用户名',
            dataIndex: 'name',
            width: 80
        }, {
            title: '说明',
            dataIndex: 'explain',
            width: 80
        }];
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="管理" second="作业管理" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="任务作业表格" bordered={false}>
                                <div style={{ marginBottom: 16 }}>
                                    <Button type="primary" onClick={this.start}
                                            disabled={loading} loading={loading}
                                    >Reload</Button>
                                    <span style={{ marginLeft: 8 }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
                                </div>
                                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.homeWorks} rowKey="id" scroll={{ x: 1300 }} />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default MissionHomework;
