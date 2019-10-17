/**
 * Created by Taryn on 2019/10/16.
 */
import React from 'react';
import {Table, Button, Row, Col, Card } from 'antd';
import { getArticles, deleteArticles } from '../../../axios';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import { withRouter } from 'react-router-dom';

class ArticleManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            articles: [],
        };
    }

    componentDidMount() {
        this.start();
    }
    start = () => {
        this.setState({ loading: true });
        getArticles().then((res) => {
            console.log(res)
            this.setState({
                articles: res.data.records,
                loading:false
            });
        });
    };
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    deleteArticle = (id) => {
        console.log(id);
        deleteArticles(id).then((res) => {
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
            title: '标题',
            dataIndex: 'title',
            width: 80,
        }, {
            title: '用户名称',
            dataIndex: 'name',
            width: 80
        }, {
            title: 'Action',
            key: 'action',
            width: 80,
            render: (text, record) => (
                <span>
                <Button onClick={() => {this.deleteArticle(record.id)}}>删除</Button>
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
                <BreadcrumbCustom first="管理" second="文章管理" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="文章管理表格" bordered={false}>
                                <div style={{ marginBottom: 16 }}>
                                    <Button type="primary" onClick={this.start}
                                            disabled={loading} loading={loading}
                                    >Reload</Button>
                                    <span style={{ marginLeft: 8 }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
                                </div>
                                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.articles} rowKey="id" scroll={{ x: 1300 }} />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default withRouter(ArticleManage);
