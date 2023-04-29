import { Button, Title } from '@/src/components';
import { Col, Input, Row } from 'antd';
import Reputation from './Reputation/Reputation';
import { useState } from 'react';
import Link from 'next/link';
import PATH from '@/src/shared/path';

const ProductModule: React.FC = () => {
	// useState
	const [quantity, setQuantity] = useState(1);

	// functions
	const onChangeQuantity = (e: any) => {
		setQuantity(Number(e.target.value));
	};

	return (
		<div className="rounded bg-white p-4">
			<div className="border-b border-solid border-gray-400 pb-4">
				<Title
					level={3}
					text={`[Mới 100%] Dell Gaming G15 5525 (Ryzen 5-6600H, 8GB, 512GB, RTX 3050 4GB, 15.6'' FHD 120Hz)`}
				/>
			</div>

			<Row gutter={24} className="mt-6">
				<Col span={6}>
					<img
						src="https://laptopworld.vn/media/product/9152_lenovo_ip_1_11igl05__7.jpg"
						// src="https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
						alt="laptop"
						className="h-[200px] w-full object-contain"
					/>
				</Col>

				<Col span={9}>
					<div>
						<Title className="text-primary" text={`Deal: 19.890.000`} />
					</div>

					<Row className="mt-4">
						<Col>
							<Title level={5} text={`Bảo hành:`} />
						</Col>

						<Col className="ml-1">
							<Title level={5} className="font-normal" text={`12 tháng LaptopAZ`} />
						</Col>
					</Row>

					<Row className="mt-4">
						<Col>
							<Title level={5} text={`Tình trạng:`} />
						</Col>

						<Col className="ml-1.5">
							<Title level={5} className="font-normal" text={`4353 sản phẩm có sẵn`} />
						</Col>
					</Row>

					<Row align={'middle'} gutter={16} justify={'start'} className="mt-6">
						<Col>
							<Title level={5} text={`Số lượng`} />
						</Col>

						<Col>
							<Input
								value={quantity}
								onChange={onChangeQuantity}
								size="small"
								className="min-w-fit max-w-[60px] px-4 py-1"
							/>
						</Col>
					</Row>

					<Row gutter={24} align={'bottom'} justify={'space-between'} className="mt-6">
						<Col span={12}>
							<Button type="success" size="large" text="Thêm vào giỏ hàng" className="w-full" />
						</Col>

						<Col span={12}>
							<Link href={PATH.CART}>
								<Button type="primary" size="large" text="Mua ngay" className="w-full" />
							</Link>
						</Col>
					</Row>
				</Col>

				<Reputation />
			</Row>
		</div>
	);
};

export default ProductModule;
