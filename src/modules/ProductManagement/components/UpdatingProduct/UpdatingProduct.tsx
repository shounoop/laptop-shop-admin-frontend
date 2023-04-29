import { Button, Title } from '@/src/components';
import mainAxios from '@/src/libs/main-axios';
import { Col, Input, Modal, Row } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface Props {
	oldData?: {
		action?: { productId?: string };
		description?: string;
		photoUrl?: string;
		price?: number;
		productName?: string;
		quantity?: number;
		type?: string;
	};
}

const UpdatingProduct: React.FC<Props> = (props) => {
	const { oldData } = props;

	// useRouter
	const router = useRouter();

	// useState
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [productName, setProductName] = useState(oldData?.productName);
	const [price, setPrice] = useState(oldData?.price);
	const [description, setDescription] = useState(oldData?.description);
	const [photoUrl, setPhotoUrl] = useState(oldData?.photoUrl);
	const [quantity, setQuantity] = useState(oldData?.quantity);
	const [type, setType] = useState(oldData?.type);

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

	const handleUpdate = async () => {
		if (!oldData?.action?.productId) return;

		try {
			const payload = {
				productName,
				price,
				description,
				photoUrl,
				quantity,
				type,
			};

			await mainAxios.patch(
				`http://localhost:3004/products?productId=${oldData?.action?.productId}`,
				payload
			);

			handleOk();
			router.reload();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<Button text="Sửa" onClick={showModal} />

			<Modal
				title={<Title className="pb-4" level={3} text={`Sửa sản phẩm`} />}
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
								spellCheck={false}
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
								spellCheck={false}
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
							spellCheck={false}
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
							spellCheck={false}
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
							spellCheck={false}
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
							spellCheck={false}
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
						text="Xong"
						onClick={handleUpdate}
					/>
				</div>
			</Modal>
		</div>
	);
};

export default UpdatingProduct;
