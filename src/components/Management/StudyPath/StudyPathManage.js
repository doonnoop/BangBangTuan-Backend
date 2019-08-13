/**
 * Created by peng on 2019/8/8.
 */
import React from 'react';
import {Table, Button, Row, Col, Card } from 'antd';
import { getStudyPath, deleteStudyPath} from '../../../axios';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import { withRouter } from 'react-router-dom';
import CreateStudyPathForm from "./createStudyPathForm";
import StudyPathTasks from "./StudyPathTasks";

class StudyPathManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            path: [],
            visible: false,
        };
    }

    componentDidMount() {
        this.start();
    }
    start = () => {
        this.setState({ loading: true });
        getStudyPath().then((res) => {
            console.log(res)
            this.setState({
                path: res.data.records,
                loading:false
            });
        });
    };
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    deleteStudyPath = (id) => {
        console.log(id);
        deleteStudyPath(id).then((res) => {
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
            title: '路径名称',
            dataIndex: 'title',
            width: 80,
        }, {
            title: '用时',
            dataIndex: 'time',
            width: 80
        }, {
            title: 'Action',
            key: 'action',
            width: 80,
            render: (text, record) => (
                <span>
                <Button onClick={() => {this.deleteStudyPath(record.id)}}>删除</Button>
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
                <BreadcrumbCustom first="管理" second="路径管理" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="路径管理表格" bordered={false}>
                                <div style={{ marginBottom: 16 }}>
                                    <Button type="primary" onClick={this.start}
                                            disabled={loading} loading={loading}
                                    >Reload</Button>
                                    <span style={{ marginLeft: 8 }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
                                    <CreateStudyPathForm start={this.start} />
                                </div>
                                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.path} rowKey="id"
                                       expandedRowRender={record => <StudyPathTasks id={record.id} />} />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default withRouter(StudyPathManage);
