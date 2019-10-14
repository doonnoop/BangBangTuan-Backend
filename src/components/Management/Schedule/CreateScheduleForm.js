/**
 * Created by peng on 2019/7/30.
 */
import React, { Component } from 'react';
import {Button, Modal, Form, Input, DatePicker} from 'antd';
import { createSchedule } from '../../../axios';
import moment from 'moment';
const FormItem = Form.Item;

class CreateScheduleForm extends Component {
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

            // console.log(moment(values.openingTime).format("YYYY-MM-DD HH:MM"));
            values.openingTime = moment(values.openingTime).format("YYYY-MM-DD HH:MM");
            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
            createSchedule(values).then((res) => {
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
                        title="创建新日程"
                        okText="创建"
                        onCancel={onCancel}
                        onOk={onCreate}
                    >
                        <Form layout="vertical">
                            <FormItem label="标题">
                                {getFieldDecorator('title', {
                                    rules: [{ required: true, message: '请输入标题!' }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem label="路由">
                                {getFieldDecorator('route', {
                                    rules: [{required: true, message: '请输入路由!'}]
                                })(<Input />)}
                            </FormItem>
                            <FormItem label="开团时间">
                                {getFieldDecorator('openingTime', {
                                    rules: [{ required: true, message: '请选择开团时间!' }],
                                })(
                                    <DatePicker placeholder="请选择开团时间" format="YYYY-MM-DD" />
                                )}
                            </FormItem>
                        </Form>
                    </Modal>
                );
            }
        );
        return (
            <div>
                <Button style={{ float: "right", marginTop: -30 }} type="primary" onClick={this.showModal}>新建日程</Button>
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

export default CreateScheduleForm;
