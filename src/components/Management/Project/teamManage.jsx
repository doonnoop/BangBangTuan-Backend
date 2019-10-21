/**
 * Created by Taryn on 2019/7/25.
 */
import React from 'react';
import { Table, Button, Row, Col, Card } from 'antd';
import { getTeamMatching } from '../../../axios';
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
    title: '手机号',
    dataIndex: 'phone',
    width: 80
}, {
    title: 'userID',
    dataIndex: 'userId',
    width: 80
},{
    title: '微信号',
    dataIndex: 'weixin',
    width: 80
},{
    title: '状态',
    dataIndex: 'status',
    width: 80
}];

class TeamManage extends React.Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        teams: []
    };
    componentDidMount() {
        this.start();
    }
    start = () => {
        this.setState({ loading: true });
        getTeamMatching().then((res) => {
            console.log(res)
            this.setState({
                teams: res.data.records,
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
                <BreadcrumbCustom first="管理" second="组队管理" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="组队管理表格" bordered={false}>
                                <div style={{ marginBottom: 16 }}>
                                    <Button type="primary" onClick={this.start}
                                            disabled={loading} loading={loading}
                                    >Reload</Button>
                                    <span style={{ marginLeft: 8 }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
                                </div>
                                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.teams} rowKey="id" />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default TeamManage;
