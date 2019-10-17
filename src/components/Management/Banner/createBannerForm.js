/**
 * Created by Taryn on 2019/10/17.
 */

import React from "react";
import { createBanner } from "../../../axios";
import {Button, Form, Icon, Input, message, Modal, Upload} from "antd";
const FormItem = Form.Item;

class CreateBannerForm extends React.Component {
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
            if(values.url === undefined) {
                message.error("上传图片");
                return;
            }
            if( values.url.response === "" || values.url.response === undefined ) {
                message.error("图片上传失败")
            } else {
                values.url = values.url.response.data;
                console.log('Received values of form: ', values);
                form.resetFields();
                this.setState({ visible: false });
                createBanner(values).then((res) => {
                    console.log(res);
                    message.success("添加成功");
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
        const CollectionCreateForm = Form.create()(
            (props) => {
                const { visible, onCancel, onCreate, form } = props;
                const { getFieldDecorator } = form;
                return (
                    <Modal
                        visible={visible}
                        title="添加轮播图"
                        okText="创建"
                        onCancel={onCancel}
                        onOk={onCreate}
                    >
                        <Form layout="vertical">
                            <FormItem label="轮播图名称">
                                {getFieldDecorator('name')(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem label="图片">
                                {getFieldDecorator('url', {
                                    valuePropName: 'file',
                                    getValueFromEvent: this.normFile,
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
                            </FormItem>
                            <FormItem label="路由">
                                {getFieldDecorator('route')(
                                    <Input />
                                )}
                            </FormItem>
                        </Form>
                    </Modal>
                );
            }
        );
        return (
            <div>
                <Button style={{ float: "right", marginTop: -30 }} type="primary" onClick={this.showModal}>添加轮播图</Button>
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

export default CreateBannerForm;
