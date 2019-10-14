/**
 * Created by peng on 2019/9/12.
 */
import React from 'react';
import {Table, Button, Row, Col, Card } from 'antd';
import { getShopItems, deleteShopItem } from '../../axios';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { withRouter } from 'react-router-dom';

class ShopItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            shopItems: [],
            visible: false,
            imgLoading: false
        };
    }

    componentDidMount() {
        this.start();
    }
    start = () => {
        this.setState({ loading: true });
        getShopItems().then((res) => {
            console.log(res)
            this.setState({
                shopItems: res.data.records,
                loading:false
            });
        });
    };
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    deleteShopItem = (id) => {
        console.log(id);
        deleteShopItem(id).then((res) => {
            console.log(res);
            this.start();
        });
    };

    render() {
        const columns = [{
            title: 'ID',
            dataIndex: 'id',
            width: 5
        },{
            title: '商品名称',
            dataIndex: 'commodityName',
            width: 200,
            render: (text, record) => {
                return <div style={{display: "flex", flexDirection: 'row'}}>
                    <div style={{marginRight: 10}}><img src={record.commodityImage} style={{width: 60, height: 60}} alt="a" /></div>
                    <div>{text}</div>
                </div>
            }
        }, {
            title: '价格',
            dataIndex: 'commodityPrice',
            width: 80
        }, {
            title: '库存',
            dataIndex: 'commodityInventory',
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
            title: 'Action',
            key: 'action',
            width: 80,
            render: (text, record) => (
                <span>
                <Button onClick={() => {this.deleteShopItem(record.id)}}>删除</Button>
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
                <BreadcrumbCustom first="商城" second="兑换商品" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="兑换商品表格" bordered={false}>
                                <div style={{ marginBottom: 16 }}>
                                    <Button type="primary" onClick={this.start}
                                            disabled={loading} loading={loading}
                                    >Reload</Button>
                                    <span style={{ marginLeft: 8 }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
                                </div>
                                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.shopItems} rowKey="id" scroll={{ x: 1300 }} />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default withRouter(ShopItems);
