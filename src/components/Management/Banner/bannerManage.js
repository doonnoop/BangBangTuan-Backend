/**
 * Created by Taryn on 2019/10/17.
 */
import React from 'react';
import { Table, Row, Col, Card, Input, InputNumber, Popconfirm, Form, Button } from 'antd';
import { getBanners, deleteBanner, editBannerRoute } from '../../../axios';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import CreateBannerForm from './createBannerForm';
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        return <Input />;
    };
    render() {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const { getFieldDecorator } = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem style={{ margin: 0 }}>
                                    {getFieldDecorator(dataIndex, {
                                        rules: [{
                                            required: true,
                                            message: `Please Input ${title}!`,
                                        }],
                                        initialValue: record[dataIndex],
                                    })(this.getInput())}
                                </FormItem>
                            ) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

class BannerManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editingKey: '',
            selectedRowKeys: [],
            loading: false,
        };
        this.columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                width: '10%',
            },
            {
                title: '图片',
                dataIndex: 'url',
                width: '25%',
                render: (text, record) => {
                    return <img src={text} alt={record.name} style={{ width: '80%'}} />
                }
            },
            {
                title: 'name',
                dataIndex: 'name',
                width: '10%',
            },
            {
                title: '路由',
                dataIndex: 'route',
                width: '25%',
                editable: true,
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) => {
                    const editable = this.isEditing(record);
                    return (
                        <div>
                            {editable ? (
                                <span>
									<EditableContext.Consumer>
										{form => (
                                            <Button
                                                onClick={() => this.save(form, record.id)}
                                                style={{ marginRight: 8 }}
                                            >
                                                保存
                                            </Button>
                                        )}
									</EditableContext.Consumer>
									<Popconfirm title="确认取消？" onConfirm={() => this.cancel(record.id)} >
										<Button>取消</Button>
									</Popconfirm>
								</span>
                            ) : (
                                <Button onClick={() => this.edit(record.id)}>编辑</Button>
                            )}
                            <span>
                                <Button onClick={() => {this.deleteBanner(record.id)}}>删除</Button>
                            </span>
                        </div>
                    );
                },
            },
        ];
    }

    componentDidMount() {
        this.start();
    }
    start = () => {
        this.setState({ loading: true });
        getBanners().then((res) => {
            console.log(res);
            this.setState({
                banners: res.data.records,
                loading:false
            });
        });
    };

    deleteBanner = (id) => {
        console.log(id);
        deleteBanner(id).then((res) => {
            console.log(res);
            this.start();
        });
    };

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    isEditing = (record) => {
        return record.id === this.state.editingKey;
    };
    edit(key) {
        this.setState({ editingKey: key });
    }
    save(form, id) {
        console.log(id)
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            row.id = id;
            console.log('Received values of form: ', row);
            editBannerRoute(JSON.stringify(row)).then((res) => {
                console.log(res);
                this.setState({
                    editingKey: '',
                });
                this.start();
            });
        });
    }
    cancel = () => {
        this.setState({ editingKey: '' });
    };

    render() {
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="管理" second="轮播图管理" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="轮播图管理表格" bordered={false}>
                                <div style={{ marginBottom: 16 }}>
                                    <Button type="primary" onClick={this.start}
                                            disabled={loading} loading={loading}
                                    >Reload</Button>
                                    <span style={{ marginLeft: 8 }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
                                    <CreateBannerForm start={this.start} />
                                </div>
                                <Table
                                    rowSelection={rowSelection}
                                    rowKey="id"
                                    components={components}
                                    dataSource={this.state.banners}
                                    columns={columns}
                                    rowClassName="editable-row"
                                    scroll={{ x: 1300 }}
                                />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default BannerManage;
