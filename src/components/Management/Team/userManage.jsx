/**
 * Created by peng on 2019/7/24.
 */
import React from 'react';
import { Table, Button, Row, Col, Card } from 'antd';
import { getAllUsers } from '../../../axios';
import BreadcrumbCustom from '../../BreadcrumbCustom';
const columns = [{
    title: 'ID',
    dataIndex: 'id',
    width: 80
},{
    title: '用户名',
    dataIndex: 'name',
    width: 80,
    render: (text, record) => <a href={record.url} target="_blank" rel="noopener noreferrer">{text}</a>
}, {
    title: '昵称',
    dataIndex: 'username',
    width: 80
}, {
    title: '手机号',
    dataIndex: 'phone',
    width: 80
},{
    title: '微信号',
    dataIndex: 'weixin',
    width: 80
},{
    title: 'ROLE',
    dataIndex: 'role',
    width: 80
}];

class UserManage extends React.Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        users: []
    };
    componentDidMount() {
        this.start();
    }
    start = () => {
        this.setState({ loading: true });
        getAllUsers().then((res) => {
            console.log(res)
            this.setState({
                users: res.data.records,
                loading:false
            });
        });
    };
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
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
                <BreadcrumbCustom first="管理" second="用户管理" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="用户管理表格" bordered={false}>
                                <div style={{ marginBottom: 16 }}>
                                    <Button type="primary" onClick={this.start}
                                            disabled={loading} loading={loading}
                                    >Reload</Button>
                                    <span style={{ marginLeft: 8 }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
                                </div>
                                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.users} rowKey="id" />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default UserManage;
