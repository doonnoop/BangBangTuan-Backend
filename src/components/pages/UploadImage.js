/**
 * Created by peng on 2019/8/22.
 */
import React from 'react';
import {Col, Icon, Row, Upload, Button, message} from "antd";


class UploadImage extends React.Component {
    state = {
        animated: ''
    };

    render() {
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
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        return (
            <Row gutter={8}>
                <Col span={24}>
                    <Upload {...props}>
                        <Button>
                            <Icon type="upload" /> Click to Upload
                        </Button>
                    </Upload>
                    <div>{this.state.filename}</div>
                </Col>
            </Row>
        )
    }
}

export default UploadImage;
