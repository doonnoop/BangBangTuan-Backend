/**
 * Created by Taryn on 2019/8/22.
 */
import React from 'react';
import {Col, Icon, Row, Upload, Button, message} from "antd";


class UploadImage extends React.Component {
    state = {

    };

    render() {
        let that = this;
        const props = {
            name: 'file',
            action: 'https://api.bangneedu.com/upload',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                    that.setState({
                        url: info.file.response.data
                    })
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        return (
            <Row gutter={8}>
                <Col span={24}>
                    <div style={{margin: 40}}>
                        <Upload {...props} listType="picture">
                            <Button>
                                <Icon type="upload" /> 上传图片
                            </Button>
                        </Upload>
                        <div style={{marginTop: 10}}>{this.state.url}</div>
                    </div>
                </Col>
            </Row>
        )
    }
}

export default UploadImage;
