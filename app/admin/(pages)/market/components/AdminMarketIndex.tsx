'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import { ACTION_CREATE } from '@/constants/action';
import AdminMarketCreate from './AdminMarketCreate';
import AdminMarketList from './AdminMarketList';
const AdminMarketIndex = () => {
    const searchParams = useSearchParams();
    const action = searchParams.get('action');
    return (
        <>
            {
                action == ACTION_CREATE ?
                    <AdminMarketCreate></AdminMarketCreate> :
                    <AdminMarketList></AdminMarketList>
            }
        </>
    )
}

export default AdminMarketIndex