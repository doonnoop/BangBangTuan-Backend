/**
 * Created by peng on 2019/8/8.
 */
import React, { Component } from 'react';
import {Button, Modal, Form, Input} from 'antd';
import { createStudyPath } from '../../../axios';
const FormItem = Form.Item;

class CreateStudyPathForm extends Component {
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
            createStudyPath(values).then((res) => {
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
                        title="创建学习路径"
                        okText="创建"
                        onCancel={onCancel}
                        onOk={onCreate}
                    >
                        <Form layout="vertical">
                            <FormItem label="路径名称">
                                {getFieldDecorator('title', {
                                    rules: [{ required: true, message: '请输入路径名称!' }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem label="用时">
                                {getFieldDecorator('time', {
                                    rules: [{required: true, message: '请输入用时!'}]
                                })(<Input />)}
                            </FormItem>
                        </Form>
                    </Modal>
                );
            }
        );
        return (
            <div>
                <Button style={{ float: "right", marginTop: -30 }} type="primary" onClick={this.showModal}>新建学习路径</Button>
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

export default CreateStudyPathForm;
