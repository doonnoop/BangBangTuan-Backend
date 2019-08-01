/**
 * Created by peng on 2019/7/30.
 */
import React, { Component } from 'react';
import {Button, Modal, Form, Input, Radio, message, Upload, Icon} from 'antd';
import { createProjects } from '../../axios/index';
const FormItem = Form.Item;

class CreateProjectForm extends Component {
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
            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
            createProjects(values).then((res) => {
                console.log(res);
                this.props.start();
            });
        });
    };
    saveFormRef = (form) => {
        this.form = form;
    };
    render() {
        const CollectionCreateForm = Form.create()(
            (props) => {
                const { visible, onCancel, onCreate, form } = props;
                const { getFieldDecorator } = form;
                return (
                    <Modal
                        visible={visible}
                        title="创建新项目"
                        okText="创建"
                        onCancel={onCancel}
                        onOk={onCreate}
                    >
                        <Form layout="vertical">
                            <FormItem label="项目名称">
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: '请输入项目名称!' }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem label="项目介绍">
                                {getFieldDecorator('details', {
                                    rules: [{required: true}]
                                })(<Input type="textarea" row={3} />)}
                            </FormItem>
                            <FormItem label="技术栈">
                                {getFieldDecorator('technology', {
                                    rules: [{ message: '请输入技术栈!' }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem className="collection-create-form_last-form-item" style={{marginBottom: 0}}>
                                {getFieldDecorator('type', {
                                    initialValue: '1',
                                })(
                                    <Radio.Group>
                                        <Radio value="1">实习</Radio>
                                        <Radio value="2">练习</Radio>
                                    </Radio.Group>
                                )}
                            </FormItem>

                        </Form>
                    </Modal>
                );
            }
        );
        return (
            <div>
                <Button style={{ float: "right", marginTop: -30 }} type="primary" onClick={this.showModal}>新建项目</Button>
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

export default CreateProjectForm;
