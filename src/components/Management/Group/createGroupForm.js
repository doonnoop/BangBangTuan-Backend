/**
 * Created by Taryn on 2019/11/7.
 */
import React, { Component } from 'react';
import {Button, Modal, Form, Input, Upload, Icon, message} from 'antd';
import { createGroup } from '../../../axios';
const FormItem = Form.Item;

class CreatGroupForm extends Component {
    state = {
        visible: false,
    };
    showModal = () => {
        this.setState({ visible: true });
    };
    handleCancel = () => {
        this.setState({ visible: false });
    };
    handleCreate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            if(values.image === undefined) {
                message.error("上传图片");
                return;
            }
            if(values.image.response === "" || values.image.response === undefined ) {
                message.error("图片上传失败")
            } else {
                values.image = values.image.response.data;
                console.log('Received values of form: ', values);
                form.resetFields();
                this.setState({ visible: false });
                createGroup(values).then((res) => {
                    console.log(res);
                    this.props.start();
                });
            }
        });
    };
    saveFormRef = (form) => {
        this.form = form;
    };
    normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        if(e.file.response ) {
            message.success("上传成功")
        }
        return e && e.file;
    };
    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 19 },
            },
        };
        const CollectionCreateForm = Form.create()(
            (props) => {
                const { visible, onCancel, onCreate, form } = props;
                const { getFieldDecorator } = form;
                return (
                    <Modal
                        visible={visible}
                        title="创建新自学团"
                        okText="创建"
                        onCancel={onCancel}
                        onOk={onCreate}
                    >
                        <Form {...formItemLayout} layout="vertical" style={{marginTop: 40}} onSubmit={this.handleCreate}>
                            <FormItem label="学习路径id">
                                {getFieldDecorator('learningPathId', {
                                    rules: [{ required: true, message: '请输入学习路径id!' }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem label="技术栈">
                                {getFieldDecorator('technology', {
                                    rules: [{ required: true, message: '请输入技术栈!' }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <Form.Item label="图片">
                                {getFieldDecorator('image', {
                                    valuePropName: 'file',
                                    getValueFromEvent: this.normFile,
                                    rules: [{ required: true, message: '请添加照片!' }],
                                })(
                                    <Upload name="file" action="https://api.bangneedu.com/upload" listType="picture"
                                            headers={
                                                {'Authorization': 'Bearer ' + localStorage.getItem('token')}
                                            }
                                    >
                                        <Button>
                                            <Icon type="upload" />上传图片
                                        </Button>
                                    </Upload>,
                                )}
                            </Form.Item>
                        </Form>
                    </Modal>
                );
            }
        );
        return (
            <div>
                <Button style={{ float: "right", marginTop: -30 }} type="primary" onClick={this.showModal}>新建自学团</Button>
                <CollectionCreateForm
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}

export default CreatGroupForm;
