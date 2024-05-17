'use client';
import NavBar from '@/components/admin/NavBar';
import React, { useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

import { Button, Divider, Layout, Menu, MenuProps, theme } from 'antd';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubesStacked, faFlag, faGlobe, faPlus } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { ADMIN_MARKET, ADMIN_TOPIC, ADMIN_TOUR } from '@/constants/route';
import { ACTION_CREATE, ACTION_LIST } from '@/constants/action';
const { Header, Sider, Content } = Layout;


function AdminLayout(
  { children }: {
    children: React.ReactNode;
  }) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems: MenuProps['items'] = [
    {
      key: `${ADMIN_MARKET}`,
      icon: <FontAwesomeIcon icon={faGlobe}></FontAwesomeIcon>,
      label: 'Quản lý tuyến tour',
      children: [
        {
          key: `${ADMIN_MARKET}/${ACTION_CREATE}`,
          icon: <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>,
          label: <Link href={{
            pathname: ADMIN_MARKET,
            query: { action: ACTION_CREATE },
          }}>Thêm tuyến tour</Link>,
        },
        {
          key: `${ADMIN_MARKET}/${ACTION_LIST}`,
          icon: <FontAwesomeIcon icon={faGlobe}></FontAwesomeIcon>,
          label: <Link href={{
            pathname: ADMIN_MARKET,
            query: { action: ACTION_LIST },
          }}>Danh sách tuyến tour</Link>,
        }
      ]
    },
    {
      key: ADMIN_TOUR,
      icon: <FontAwesomeIcon icon={faFlag}></FontAwesomeIcon>,
      label: 'Quản lý tour',
    },
    {
      key: ADMIN_TOPIC,
      icon: <FontAwesomeIcon icon={faCubesStacked}></FontAwesomeIcon>,
      label: 'Quản lý chủ đề',
    },
  ]

  return (
    <>
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className='flex flex-row justify-center pt-2'>
            <Image
              src="/assets/images/sgt-logo.png"
              alt="SaiGonTimes Travel"
              width={146}
              height={0}
            />
          </div>
          <Divider className='!my-2.5 bg-slate-600' />
          <Menu
            className='!text-xs !pl-0'
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[`${ADMIN_MARKET}/${ACTION_LIST}`]}
            inlineIndent={12}
            items={menuItems}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default AdminLayout