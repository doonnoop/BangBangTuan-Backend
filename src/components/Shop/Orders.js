/**
 * Created by peng on 2019/10/10.
 */
import React from 'react';
import {Col, Row, Button, Card, Table} from "antd";
import {getOrders, deleteOrder} from "../../axios";
import BreadcrumbCustom from "../BreadcrumbCustom";


class Orders extends React.Component {
    state = {
        selectedRowKeys: [],
        loading: false,
        orders: [],
        visible: false,
        imgLoading: false
    };

    componentDidMount() {
        this.start();
    }

    start = () => {
        this.setState({ loading: true });
        getOrders().then((res) => {
            console.log(res)
            this.setState({
                orders: res.data,
                loading:false
            });
        });
    };
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    deleteOrder = (id) => {
        console.log(id);
        deleteOrder(id).then((res) => {
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
            title: '商品名称',
            dataIndex: 'commodityName',
            width: 200,
            render: (text, record) => {
                return <div style={{display: "flex", flexDirection: 'row'}}>
                    <div style={{marginRight: 10}}><img alt="a" src={record.commodityImage} style={{width: 60, height: 60}} /></div>
                    <div>{text}</div>
                </div>
            }
        }, {
            title: '商品数量',
            dataIndex: 'commodityNumber',
            width: 80
        },{
            title: '价格',
            dataIndex: 'commodityPrice',
            width: 80
        }, {
            title: '规格',
            dataIndex: 'commoditySpecifications',
            width: 80
        }, {
            title: '运费',
            dataIndex: 'commodityFreight',
            width: 80
        }, {
            title: '配送时间',
            dataIndex: 'deliveryTime',
            width: 80
        }, {
            title: '配送地址',
            dataIndex: 'bbtUserAddressId',
            width: 80
        }, {
            title: '收件人',
            dataIndex: 'name',
            width: 80
        }, {
            title: '用户',
            dataIndex: 'bbtUserId',
            width: 80
        }, {
            title: '商品总价',
            dataIndex: 'aggregateScore',
            width: 80
        }, {
            title: '下单时间',
            dataIndex: 'createTime',
            width: 80
        }, {
            title: '支付时间',
            dataIndex: 'paymentTime',
            width: 80
        }, {
            title: '配货时间',
            dataIndex: 'distributionTime',
            width: 80
        }, {
            title: '出库时间',
            dataIndex: 'outboundTime',
            width: 80
        }, {
            title: '完成时间',
            dataIndex: 'completeTime',
            width: 80
        }, {
            title: 'Action',
            key: 'action',
            width: 80,
            render: (text, record) => (
                <span>
                <Button onClick={() => {this.deleteOrder(record.id)}}>删除</Button>
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
                <BreadcrumbCustom first="商城" second="所有订单" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="所有订单表格" bordered={false}>
                                <div style={{ marginBottom: 16 }}>
                                    <Button type="primary" onClick={this.start}
                                            disabled={loading} loading={loading}
                                    >Reload</Button>
                                    <span style={{ marginLeft: 8 }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
                                </div>
                                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.orders} rowKey="id" scroll={{ x: 1300 }} />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Orders;
