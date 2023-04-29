import { Button, Title } from '@/src/components';
import mainAxios from '@/src/libs/main-axios';
import { Col, Input, Modal, Row } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface Props {}

const AddingNewProduct: React.FC<Props> = (props) => {
	// useRouter
	const router = useRouter();

	// useState
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [productName, setProductName] = useState('');
	const [price, setPrice] = useState(0);
	const [description, setDescription] = useState('');
	const [photoUrl, setPhotoUrl] = useState('');
	const [quantity, setQuantity] = useState(0);
	const [type, setType] = useState('');

	// functions
	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const handleAddingNew = async () => {
		try {
			const payload = {
				productName,
				price,
				description,
				photoUrl,
				quantity,
				type,
			};

			await mainAxios.post(`http://localhost:3004/products`, payload);

			handleOk();
			router.reload();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<Button type="success" text="Thêm sản phẩm" onClick={showModal} />

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
								onChange={(e) => setProductName(e.target.value)}
								className="mt-2"
							/>
						</Col>

						<Col>
							<Title text={'Giá'} level={5} isNormal />
							<Input
								size="small"
								value={price}
								onChange={(e) => setPrice(Number(e.target.value))}
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
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Nhập mô tả..."
							className="mt-2"
						/>
					</div>

					<div className="mt-4">
						<Title text={'Ảnh (url)'} level={5} isNormal />
						<Input
							size="small"
							value={photoUrl}
							onChange={(e) => setPhotoUrl(e.target.value)}
							placeholder="http://"
							className="mt-2"
						/>
					</div>

					<div className="mt-4">
						<Title text={'Số lượng'} level={5} isNormal />
						<Input
							size="small"
							value={quantity}
							onChange={(e) => setQuantity(Number(e.target.value))}
							placeholder="Nhập số lượng..."
							className="mt-2"
						/>
					</div>

					<div className="mt-4">
						<Title text={'Kiểu'} level={5} isNormal />
						<Input
							size="small"
							value={type}
							onChange={(e) => setType(e.target.value)}
							placeholder="Nhập kiểu..."
							className="mt-2"
						/>
					</div>

					<Button
						className="mt-4 w-full"
						size="large"
						type="success"
						text="Thêm sản phẩm"
						onClick={handleAddingNew}
					/>
				</div>
			</Modal>
		</div>
	);
};

export default AddingNewProduct;
