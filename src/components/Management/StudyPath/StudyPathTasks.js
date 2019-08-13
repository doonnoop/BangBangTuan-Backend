/**
 * Created by peng on 2019/8/8.
 */
import React from 'react';
import {Table, Button } from 'antd';
import { getStudyPathTasks, deleteStudyPathTask} from '../../../axios';
import { withRouter } from 'react-router-dom';
import CreateStudyPathTaskForm from "./createStudyPathTaskForm";

class StudyPathTasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            pathTasks: [],
            visible: false,
        };
    }

    componentDidMount() {
        this.start();
    }
    start = () => {
        this.setState({ loading: true });
        getStudyPathTasks(this.props.id).then((res) => {
            console.log(res)
            this.setState({
                pathTasks: res.data,
                loading:false
            });
        });
    };
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    deleteStudyPathTask = (id) => {
        console.log(id);
        deleteStudyPathTask(id).then((res) => {
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
        },{
            title: '详情',
            dataIndex: 'details',
            width: 80,
        }, {
            title: '用时',
            dataIndex: 'time',
            width: 80
        }, {
            title: 'Action',
            key: 'action',
            width: 80,
            render: (text, record) => (<span>
                <Button onClick={() => {this.deleteStudyPathTask(record.id)}}>删除</Button>
            </span>
            ),
        }];
        const { loading } = this.state;
        return (
            <div className="gutter-example">
                <div style={{ marginBottom: 16 }}>
                    <Button type="primary" onClick={this.start}
                            disabled={loading} loading={loading}
                    >Reload</Button>
                    <CreateStudyPathTaskForm start={this.start} id={this.props.id} />
                </div>
                <Table columns={columns} dataSource={this.state.pathTasks} rowKey="id" />
            </div>
        );
    }
}

export default withRouter(StudyPathTasks);
