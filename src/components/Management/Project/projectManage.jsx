/**
 * Created by peng on 2019/7/29.
 */
import React from 'react';
import {Table, Button, Row, Col, Card, Upload, Icon } from 'antd';
import { getAllProjects, deleteProjects, editProjects} from '../../../axios';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import { withRouter, Link } from 'react-router-dom';
import CreateProjectForm from "./createProjectForm";

class ProjectManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            projects: [],
            visible: false,
            imgLoading: false
        };
    }

    componentDidMount() {
        this.start();
    }
    start = () => {
        this.setState({ loading: true });
        getAllProjects().then((res) => {
            console.log(res)
            this.setState({
                projects: res.data.records,
                loading:false
            });
        });
    };
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    deleteProject = (id) => {
        console.log(id);
        deleteProjects(id).then((res) => {
            console.log(res);
            this.start();
        });
    };

    handleChange = (info, record) => {
        if (info.file.status === 'uploading') {
            this.setState({ imgLoading: true });
            return;
        }
        if (info.file.status !== 'uploading') {
            console.log(info.file.response.data);
            console.log(record)
        }
        if (info.file.status === 'done') {
            const data = {
                "id": record.id,
                "image": info.file.response.data
            };
            editProjects(JSON.stringify(data)).then((res) => {
                console.log(res);
                this.setState({
                    imgLoading: false,
                });
                this.start();
            });
        }
    };

    render() {
        const columns = [{
            title: 'ID',
            dataIndex: 'id',
            width: 80
        },{
            title: '项目名称',
            dataIndex: 'name',
            width: 80,
            render: (text, record) => {
                return <Link to={`/app/dashboard/missions/${record.id}`}>{text}</Link>
            }
        }, {
            title: '图片',
            dataIndex: 'image',
            width: 80,
            render: (text, record) => (
                <span>
                    <Upload
                        name="file"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://api.bangneedu.com/upload"
                        headers={
                            {'Authorization': 'Bearer ' + localStorage.getItem('token')}
                        }
                        onChange={(value)=>{this.handleChange(value,record)}}
                    >
                    {text ? <img src={text} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </span>
            ),
        }, {
            title: '技术',
            dataIndex: 'technology',
            width: 80
        }, {
            title: '类型',
            dataIndex: 'type',
            width: 80
        },{
            title: '详情',
            dataIndex: 'details',
            width: 80
        },{
            title: '创建时间',
            dataIndex: 'createTime',
            width: 80
        },{
            title: 'Action',
            key: 'action',
            width: 80,
            render: (text, record) => (
                <span>
                <Button onClick={() => {this.deleteProject(record.id)}}>删除</Button>
            </span>
            ),
        }];
        const uploadButton = (
            <div>
                <Icon type={this.state.imgLoading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">上传图片</div>
            </div>
        );
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="管理" second="项目管理" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="项目管理表格" bordered={false}>
                                <div style={{ marginBottom: 16 }}>
                                    <Button type="primary" onClick={this.start}
                                            disabled={loading} loading={loading}
                                    >Reload</Button>
                                    <span style={{ marginLeft: 8 }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
                                    <CreateProjectForm start={this.start} />
                                </div>
                                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.projects} rowKey="id" scroll={{ x: 1300 }} />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default withRouter(ProjectManage);
