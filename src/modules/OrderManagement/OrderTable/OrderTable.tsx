import { Button, Title } from '@/src/components'
import mainAxios from '@/src/libs/main-axios'
import PATH from '@/src/shared/path'
import { formatPriceVND } from '@/src/utils/format-price'
import { Col, Popconfirm, Row, Table, message } from 'antd'
import { ColumnsType } from 'antd/es/table'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface DataType {
  id: string
  deliveryFee: number
  quantity: number
  totalCost: number
  isPaid: number
  subTotal: number
}

const ProductTable: React.FC = () => {
  // useRouter
  const router = useRouter()

  // useState
  const [records, setRecords] = useState<DataType[]>()
  const [orders, setOrders] = useState<any[]>()

  // useEffect
  useEffect(() => {
    ;(async () => {
      try {
        const res: any = await mainAxios.get(`http://localhost:3004/carts`)

        setOrders(res)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  useEffect(() => {
    if (!orders) return

    const mappedRecords: DataType[] = orders.map((item: any) => {
      let calculatedTotalCost = 0

      item.productsInCard.map((product: any) => {
        calculatedTotalCost += product.price * product.amount
      })

      if (item?.deliverFee?.fee) {
        calculatedTotalCost += item?.deliverFee?.fee
      }

      return {
        id: item.cartId,
        deliveryFee: item.deliverFee.fee,
        quantity: item.productsInCard.length,
        totalCost: calculatedTotalCost,
        isPaid: item.isPaid,
        subTotal: calculatedTotalCost - item.deliverFee.fee
      }
    })

    setRecords(mappedRecords)
  }, [orders])

  // columns of table
  const columns: ColumnsType<DataType> = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'id',
      render: (_, record) => (
        // <Link href={`${PATH.ORDERS}/${record?.id}` || `#`}>
        <Title level={5} text={record.id} className="hover:text-primary" />
        // </Link>
      )
    },
    {
      title: 'Phí vận chuyển',
      dataIndex: 'deliveryFee',
      render: (_, record) => (
        <Title level={5} text={`${formatPriceVND(record.deliveryFee)} VNĐ`} />
      )
    },
    {
      title: 'Số lượng',
      width: 120,
      dataIndex: 'quantity',
      render: (_, record) => <Title level={5} text={record.quantity} />
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalCost',
      render: (_, record) => (
        <Title
          level={5}
          className="text-primary"
          text={`${formatPriceVND(record.totalCost)} VNĐ`}
        />
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isPaid',
      render: (_, record) => (
        <Title
          level={5}
          className={record.isPaid ? 'text-success' : 'text-primary'}
          text={record.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
        />
      )
    },
    {
      title: 'Thao tác',
      render: (_, record) => (
        <>
          {!record?.isPaid && (
            <Row gutter={16}>
              <Col
                onClick={() => handleDeleteItem(record)}
                className="cursor-pointer"
              >
                <Button text="Hủy" />
              </Col>
            </Row>
          )}
        </>
      )
    }
  ]

  // functions
  const handleDeleteItem = async (record: any) => {
    if (!record?.id) return

    try {
      await mainAxios.delete(`http://localhost:3004/carts/${record.id}`)

      router.reload()
    } catch (error) {
      console.log(error)
    }
    return null
  }

  return (
    <div>
      <Table
        columns={columns}
        dataSource={records}
        pagination={false}
        scroll={{ x: 'max-content', y: '450px' }}
      />
    </div>
  )
}

export default ProductTable
