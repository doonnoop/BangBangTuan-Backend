/**
 * Created by Taryn on 2019/9/12.
 */
import React, { Component } from 'react';
import {Button, Form, Input, Col, Row, Upload, Icon, message} from 'antd';
import { createShopItem } from '../../axios';
const FormItem = Form.Item;

class CreateShopItem extends Component {
    state = {
        visible: false,
    };
    handleCancel = () => {
        this.setState({ visible: false });
    };
    handleCreate = (e) => {
        e.preventDefault();
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            if(values.commodityImage === undefined) {
                message.error("上传图片");
                return;
            }
            if(values.commodityImage.response === "" || values.commodityImage.response === undefined ) {
                message.error("图片上传失败")
            } else {
                values.commodityImage = values.commodityImage.response.data;
                console.log('Received values of form: ', values);
                form.resetFields();
                this.setState({ visible: false });
                createShopItem(values).then((res) => {
                    console.log(res);
                    message.success("添加成功");
                    this.props.history.push('/app/dashboard/shop')
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
                const { form } = props;
                const { getFieldDecorator } = form;
                return (
                    <Form {...formItemLayout} layout="vertical" style={{marginTop: 40}} onSubmit={this.handleCreate}>
                        <FormItem label="商品名称">
                            {getFieldDecorator('commodityName', {
                                rules: [{ required: true, message: '请输入商品名称!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <Form.Item label="商品图片">
                            {getFieldDecorator('commodityImage', {
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
                        </Form.Item>
                        <FormItem label="库存">
                            {getFieldDecorator('commodityInventory', {
                                rules: [{ required: true, message: '请输入商品库存!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="价格">
                            {getFieldDecorator('commodityPrice', {
                                rules: [{ required: true, message: '请输入商品价格!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="规格">
                            {getFieldDecorator('commoditySpecifications', {
                                rules: [{ required: true, message: '请输入商品规格!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="运费">
                            {getFieldDecorator('commodityFreight', {
                                rules: [{ required: true, message: '请输入商品运费!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="配送时间">
                            {getFieldDecorator('deliveryTime', {
                                rules: [{ required: true, message: '请输入配送时间!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                            <Button type="primary" htmlType="submit">
                                上传商品
                            </Button>
                        </Form.Item>
                    </Form>
                );
            }
        );
        return (
            <Row gutter={16}>
                <Col md={4} />
                <Col className="gutter-row" md={16}>
                    <CollectionCreateForm
                        ref={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                    />
                </Col>
                <Col md={4} />
            </Row>
        );
    }
}

export default CreateShopItem;
