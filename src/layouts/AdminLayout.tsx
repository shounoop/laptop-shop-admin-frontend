interface Props {
  children?: React.ReactNode
}

import React, { useEffect, useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons'
import { Layout, Menu, Button, theme } from 'antd'
import { Title } from '@/src/components'
import Link from 'next/link'
import PATH from '../shared/path'
import { useRouter } from 'next/router'

const { Header, Sider, Content } = Layout

enum MenuItemKey {
  PRODUCT = 'product',
  USER = 'user'
}

const AdminLayout: React.FC<Props> = props => {
  const { children } = props

  // useRouter
  const router = useRouter()

  const [collapsed, setCollapsed] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState<[MenuItemKey]>([
    MenuItemKey.PRODUCT
  ])

  useEffect(() => {
    if (router.asPath === PATH.PRODUCT) {
      setSelectedKeys([MenuItemKey.PRODUCT])
      return
    }
    if (router.asPath === PATH.USER) {
      setSelectedKeys([MenuItemKey.USER])
      return
    }
  }, [router])

  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <Layout>
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={selectedKeys}
          items={[
            {
              key: MenuItemKey.PRODUCT,
              icon: <UserOutlined />,
              label: (
                <Link href={PATH.PRODUCT}>
                  <Title level={5} text={'Product'} />
                </Link>
              )
            },
            {
              key: MenuItemKey.USER,
              icon: <UserOutlined />,
              label: (
                <Link href={PATH.USER}>
                  <Title level={5} text={'User'} />
                </Link>
              )
            }
          ]}
        />
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64
            }}
          />
        </Header>

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout
