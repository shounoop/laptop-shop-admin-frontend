import { Button, Title } from '@/src/components'
import mainAxios from '@/src/libs/main-axios'
import { UploadOutlined } from '@ant-design/icons'
import {
  Col,
  Input,
  Modal,
  Row,
  Upload,
  Button as AntdButton,
  UploadProps,
  message
} from 'antd'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'

interface Props {}

const AddingNewProduct: React.FC<Props> = props => {
  // useRouter
  const router = useRouter()

  // useState
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [productName, setProductName] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [type, setType] = useState('')
  const [userId] = useState('01GWERJZ075EE4Q9Q61J9R0JDB')

  // functions
  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleAddingNew = async () => {
    try {
      const payload = {
        productName,
        price,
        description,
        photoUrl,
        quantity,
        type
      }

      await mainAxios.post(`http://localhost:3004/products`, payload)

      handleOk()
      router.reload()
    } catch (error) {
      console.log(error)
    }
  }

  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]

      ;(async () => {
        const formData = new FormData()
        formData.append('file', file, file.name)

        try {
          const response: any = await mainAxios.post(
            `http://localhost:3001/users/${userId}/upload-file`,
            formData
          )

          console.log('response', response)

          // dispatch(
          //   setCurrentUser({
          //     ...currentUser,
          //     imageUrl: response.message
          //   } as IGetCurrentUserProfileData)
          // )
        } catch (error) {
          console.log(error)
        }
      })()
    }
    e.target.value = ''
  }

  return (
    <div>
      <Button type="primary" text="Thêm sản phẩm" onClick={showModal} />

      <Modal
        title={<Title className="pb-4" level={3} text={`Thêm sản phẩm`} />}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="max-w-lg ">
          <Row gutter={24}>
            <Col>
              <Title text={'Tên sản phẩm'} level={5} isNormal />
              <Input
                size="small"
                placeholder="Nhập tên sản phẩm..."
                value={productName}
                onChange={e => setProductName(e.target.value)}
                className="mt-2"
              />
            </Col>

            <Col>
              <Title text={'Giá'} level={5} isNormal />
              <Input
                size="small"
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
                placeholder="Nhập giá..."
                className="mt-2"
              />
            </Col>
          </Row>

          <div className="mt-4">
            <Title text={'Mô tả'} level={5} isNormal />
            <Input
              size="small"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Nhập mô tả..."
              className="mt-2"
            />
          </div>

          <div className="mt-4">
            <Title text={'Ảnh (url)'} level={5} isNormal />
            <Input
              size="small"
              value={photoUrl}
              onChange={e => setPhotoUrl(e.target.value)}
              placeholder="http://"
              className="mt-2"
            />

            {/* <label htmlFor="laptop-img">
              <Title level={5} text={'click me to upload file'} />
            </label>

            <input
              id="laptop-img"
              type="file"
              name="file"
              style={{ visibility: `hidden`, width: 0 }}
              onChange={onUploadImage}
            /> */}
          </div>

          <div className="mt-4">
            <Title text={'Số lượng'} level={5} isNormal />
            <Input
              size="small"
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
              placeholder="Nhập số lượng..."
              className="mt-2"
            />
          </div>

          <div className="mt-4">
            <Title text={'Kiểu'} level={5} isNormal />
            <Input
              size="small"
              value={type}
              onChange={e => setType(e.target.value)}
              placeholder="Nhập kiểu..."
              className="mt-2"
            />
          </div>

          <Button
            className="mt-4 w-full"
            size="large"
            type="primary"
            text="Thêm sản phẩm"
            onClick={handleAddingNew}
          />
        </div>
      </Modal>
    </div>
  )
}

export default AddingNewProduct
