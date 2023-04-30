import { Button, Title } from '@/src/components'
import mainAxios from '@/src/libs/main-axios'
import { Col, Popconfirm, Row, Table, message } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useEffect, useState } from 'react'

interface RecordType {
  email: string
  phone: number
  firstName: string
  lastName: string
  address: number
  type: string
  action?: {
    userId?: string
  }
}

interface Props {}

const UserTable: React.FC<Props> = props => {
  // useState
  const [users, setUsers] = useState<any[]>()
  const [records, setRecords] = useState<RecordType[]>()

  // useEffect
  useEffect(() => {
    ;(async () => {
      try {
        const res: any = await mainAxios.get(`http://localhost:3001/users`)

        setUsers(res)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  useEffect(() => {
    if (!users) return

    const mappedRecords = users.map(user => ({
      email: user.email,
      phone: user.phone,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      type: user.type,
      action: { userId: user.userId }
    }))

    setRecords(mappedRecords)
  }, [users])

  // functions
  const handleDelete = async (userId: string | undefined) => {
    if (!userId) {
      return
    }

    try {
      await mainAxios.delete(`http://localhost:3001/users/${userId}`)

      const filterredUsers = users?.filter(item => item.userId !== userId)

      setUsers(filterredUsers)

      message.success('Xóa thành công')
    } catch (error) {
      console.log(error)
    }
  }

  // columns of table
  const columns: ColumnsType<RecordType> = [
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone'
    },
    {
      title: 'Tên',
      dataIndex: 'firstName'
    },
    {
      title: 'Họ',
      dataIndex: 'lastName'
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address'
    },
    {
      title: 'Kiểu',
      dataIndex: 'type'
    },
    {
      title: 'Thao tác',
      dataIndex: 'action',
      render: (_, record) => {
        return (
          <Row gutter={16} wrap={false}>
            <Col>
              <Popconfirm
                title="Xóa"
                description="Bạn có chắc chắn muốn xóa không?"
                okText="Có"
                onConfirm={() => handleDelete(record?.action?.userId)}
                cancelText="Không"
              >
                <Button type="primary" text={'Xóa'} />,
              </Popconfirm>
            </Col>
          </Row>
        )
      }
    }
  ]

  return (
    <div>
      <Table
        columns={columns}
        dataSource={records}
        className="mt-10"
        pagination={false}
        scroll={{ x: 'max-content', y: `500px` }}
      />
    </div>
  )
}

export default UserTable
