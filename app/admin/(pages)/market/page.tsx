'use client'
import React, { Suspense } from 'react'
import { useRouter } from 'next/navigation'
import AdminMarketIndex from './components/AdminMarketIndex'

const AdminMarket = () => {
    return (
        <Suspense>
            <AdminMarketIndex />
        </Suspense>
    )
}

export default AdminMarket