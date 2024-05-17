import CustomEditor from '@/components/admin/CustomEditor'
import React from 'react'

const AdminMarketCreate = () => {
    return (
        <div>
            <h1>Thêm bài viết tuyến tour</h1>
            <CustomEditor
                initialData='<h1>Hello from CKEditor in Next.js!</h1>'
            />
        </div>
    )
}

export default AdminMarketCreate