/**
 * Created by Taryn on 2019/10/21.
 */
import React from 'react';
import { Table, Button, Row, Col, Card } from 'antd';
import { getCpMatching } from '../../../axios';
import BreadcrumbCustom from '../../BreadcrumbCustom';
const columns = [{
    title: 'ID',
    dataIndex: 'id',
    width: 80
},{
    title: 'userId',
    dataIndex: 'userId',
    width: 80
},{
    title: '用户名称',
    dataIndex: 'name',
    width: 80,
}, {
    title: '技术栈',
    dataIndex: 'technology',
    width: 80
}, {
    title: '是否绑定',
    dataIndex: 'binding',
    width: 80,
    render: (text, record) => text === 0 ? <div>否</div> : <div>是</div>
},{
    title: '创建时间',
    dataIndex: 'createTime',
    width: 150
},{
    title: '修改时间',
    dataIndex: 'updateTime',
    width: 150
}];

class CPTeamManage extends React.Component {
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
        getCpMatching().then((res) => {
            console.log(res)
            this.setState({
                teams: res.data.records,
                loading: false,
                counts: res.data.total
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
                <BreadcrumbCustom first="管理" second="cp组队管理" />
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
                                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.teams} rowKey="id" scroll={{ x: 1300 }} />
                                <div>共计 { this.state.counts }</div>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CPTeamManage;
