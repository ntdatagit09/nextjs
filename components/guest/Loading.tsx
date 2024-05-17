import { Spin } from 'antd'
import { LoadingOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
import React from 'react'

const contentStyle: React.CSSProperties = {
    zIndex: 9999
};
const Loading = (props: any) => {
    const isLoading = props.isLoading ?? false;
    return (
        <Spin
            style={contentStyle}
            className='sgt-ant-spin-fullcreen !bg-black !bg-opacity-35' spinning={isLoading} fullscreen
            indicator={<LoadingOutlined className='!text-sgt-primary-default' style={{ fontSize: 48 }} />}
        >
        </Spin>
    )
}

export default Loading