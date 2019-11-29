/**
 * Created by Taryn on 2019/11/21.
 */
import React from 'react';
import {Table, Button, Row, Col, Card, Input } from 'antd';
import {getTags, deleteTag, addTag} from '../../../axios';
import BreadcrumbCustom from '../../BreadcrumbCustom';
const { Search } = Input;

class TagManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            selectedRowKeys: [],
            loading: false,
            addTag: ''
        };
    }

    componentDidMount() {
        this.start();
    }
    start = () => {
        this.setState({ loading: true });
        getTags().then((res) => {
            console.log(res)
            this.setState({
                tags: res.data.records,
                loading:false
            });
        });
    };
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    deleteTag = (id) => {
        console.log(id);
        deleteTag(id).then((res) => {
            console.log(res);
            this.start();
        });
    };

    inputChange = (e) => {
        this.setState({
            addTag: e.target.value
        })
    };

    addTag = (value) => {
        console.log(value);
        let body = {
            tag: value
        };
        addTag(body).then((res) => {
            console.log(res);
            this.setState({
                addTag: ''
            });
            this.start();
        })
    };

    render() {
        const columns = [{
            title: 'ID',
            dataIndex: 'id',
            width: 80
        },{
            title: '标签',
            dataIndex: 'tag',
            width: 80,
        }, {
            title: 'Action',
            key: 'action',
            width: 80,
            render: (text, record) => (
                <span>
                <Button onClick={() => {this.deleteTag(record.id)}}>删除</Button>
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
                <BreadcrumbCustom first="管理" second="标签管理" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="标签表格" bordered={false}>
                                <div style={{ marginBottom: 16 }}>
                                    <Button type="primary" onClick={this.start}
                                            disabled={loading} loading={loading}
                                    >Reload</Button>
                                    <br/>
                                    <Search
                                        placeholder="输入要添加的标签"
                                        enterButton="添加"
                                        onSearch={this.addTag}
                                        style={{ width: 400, marginTop: 10, float: 'right', marginBottom: 10 }}
                                        value={this.state.addTag}
                                        onChange={this.inputChange}
                                    />
                                    <span style={{ marginLeft: 8 }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
                                </div>
                                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.tags} rowKey="id" />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default TagManage;
