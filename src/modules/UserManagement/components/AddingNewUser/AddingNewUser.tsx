import { Button, Title } from '@/src/components'
import mainAxios from '@/src/libs/main-axios'
import { Col, Divider, Input, Modal, Row, Select, Space, Tag } from 'antd'
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface Props {}

interface OptionsSelect {
  value: string
  label: string
}

const AddingNewUser: React.FC<Props> = props => {
  // useRouter
  const router = useRouter()

  // useState
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [email, setEmail] = useState('hoangminhtuan01@gmail.com')
  const [firstName, setFirstName] = useState('Tuan')
  const [lastName, setLastName] = useState('Hoang')
  const [phone, setPhone] = useState('0865465453')
  const [address, setAddress] = useState('Hanoi')
  const [type, setType] = useState('sysadmin')

  const [roles, setRoles] = useState<any[]>()
  const [optionsSelect, setOptionsSelect] = useState<OptionsSelect[]>()
  const [currentValueSelect, setCurrentValueSelect] = useState<string>()
  const [selectedRoles, setSelectedRoles] = useState<any[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        const res: any[] = await mainAxios.get(`http://localhost:3001/roles`)

        setRoles(res)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  useEffect(() => {
    if (!roles) return

    const mappedOptionsSelect: OptionsSelect[] = roles.map(item => ({
      value: item.roleName,
      label: item.roleName
    }))

    setOptionsSelect(mappedOptionsSelect)
  }, [roles])

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
        email,
        firstName,
        lastName,
        phone,
        address,
        type,
        roles: selectedRoles
      }

      await mainAxios.post(`http://localhost:3002/users`, payload)

      handleOk()
      router.reload()
    } catch (error) {
      console.log(error)
    }
  }

  const onChangeSelect = (value: string) => {
    setCurrentValueSelect(value)
  }

  const handleAddingRole = () => {
    if (!currentValueSelect || !selectedRoles) return

    const newSelectedRoles = [...selectedRoles]
    newSelectedRoles.push(currentValueSelect)

    setSelectedRoles(newSelectedRoles)
  }

  return (
    <div>
      <Button type="success" text="Thêm mới" onClick={showModal} />

      <Modal
        title={
          <Title className="pb-4" level={3} text={`Thêm mới người dùng`} />
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div>
          <Title text={'Email'} level={5} isNormal />
          <Input
            size="small"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Nhập email..."
            className="mt-2"
          />
        </div>

        <Row gutter={24} className="mt-4">
          <Col>
            <Title text={'Họ'} level={5} isNormal />
            <Input
              size="small"
              placeholder="Ví dụ: Nguyễn"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              className="mt-2"
            />
          </Col>

          <Col>
            <Title text={'Tên'} level={5} isNormal />
            <Input
              size="small"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              placeholder="Ví dụ: Văn A"
              className="mt-2"
            />
          </Col>
        </Row>

        <Row gutter={24} className="mt-4">
          <Col>
            <Title text={'Số điện thoại'} level={5} isNormal />
            <Input
              size="small"
              placeholder="Nhập số điện thoại..."
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="mt-2"
            />
          </Col>

          <Col>
            <Title text={'Địa chỉ'} level={5} isNormal />
            <Input
              size="small"
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="Nhập địa chỉ..."
              className="mt-2"
            />
          </Col>
        </Row>

        <div className="mt-4">
          <Title text={'Role'} level={5} isNormal />
          <Input
            size="small"
            value={type}
            onChange={e => setType(e.target.value)}
            placeholder="sysadmin/general"
            className="mt-2"
          />
        </div>

        <div className="mt-4 max-w-lg">
          {optionsSelect && (
            <Row gutter={24}>
              <Col flex="auto">
                <Select
                  showSearch
                  className="w-full"
                  placeholder="Chọn quyền"
                  optionFilterProp="children"
                  onChange={onChangeSelect}
                  options={optionsSelect}
                  value={currentValueSelect}
                />
              </Col>

              <Col>
                <Button
                  type="success"
                  onClick={handleAddingRole}
                  text="Thêm quyền"
                />
              </Col>
            </Row>
          )}

          {selectedRoles?.length > 0 && (
            <div>
              <Divider orientation="left">Quyền đã chọn</Divider>
              <Space size={[0, 8]} wrap>
                {selectedRoles?.map((item, index) => (
                  <Tag key={index} color="orange">
                    {item}
                  </Tag>
                ))}
              </Space>
            </div>
          )}

          <Button
            className="mt-6 w-full"
            size="large"
            type="success"
            text="Thêm mới người dùng"
            onClick={handleAddingNew}
          />
        </div>
      </Modal>
    </div>
  )
}

export default AddingNewUser
