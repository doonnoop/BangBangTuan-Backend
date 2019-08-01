/**
 * Created by peng on 2019/7/31.
 */
import React, { Component } from 'react';
import {Button, Modal, Form, Input} from 'antd';
import { createProjectTask } from '../../axios/index';
const FormItem = Form.Item;

class CreateMissionForm extends Component {
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
            createProjectTask(values).then((res) => {
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
                        title="创建新任务"
                        okText="创建"
                        onCancel={onCancel}
                        onOk={onCreate}
                    >
                        <Form layout="vertical">
                            <FormItem label="项目ID">
                                {getFieldDecorator('projectId', {
                                    initialValue: this.props.id
                                })(
                                    <Input disabled />
                                )}
                            </FormItem>
                            <FormItem label="任务名称">
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: '请输入任务名称!' }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem label="任务介绍">
                                {getFieldDecorator('details', {
                                    rules: [{required: true}]
                                })(<Input type="textarea" row={3} />)}
                            </FormItem>
                        </Form>
                    </Modal>
                );
            }
        );
        return (
            <div>
                <Button style={{ float: "right", marginTop: -32 }} type="primary" onClick={this.showModal}>新建任务</Button>
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

export default CreateMissionForm;
