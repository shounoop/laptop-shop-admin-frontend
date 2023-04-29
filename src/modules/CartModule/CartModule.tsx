import { Button, Title } from '@/src/components';
import mainAxios from '@/src/libs/main-axios';
import { Col, Row, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface DataType {
	key: string;
	name: string;
	unitPrice: string;
	quantity: number;
	total: number;
}

const TAX = 1.07;

const ProductModule: React.FC = () => {
	// useRouter
	const router = useRouter();

	// useState
	const [total, setTotal] = useState(32.11);

	// functions
	const handleDeleteItem = () => {
		return null;
	};

	const handlePayment = () => {
		(async () => {
			const payload = {
				total,
				details: {
					subtotal: 31.0,
					tax: TAX,
					shipping: 0.03,
					handling_fee: 1.0,
					shipping_discount: -1.0,
					insurance: 0.01,
				},
			};

			const res: any = await mainAxios.post(`http://localhost:3001/users/payment-url`, payload);

			if (res?.links?.[1]) {
				console.log(res?.links?.[1]);
				router.replace(res?.links?.[1].href);
			}
		})();
	};

	// data of table
	const columns: ColumnsType<DataType> = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			render: (text) => <a>{text}</a>,
		},
		{
			title: 'Đơn giá',
			dataIndex: 'unitPrice',
			key: 'unitPrice',
		},
		{
			title: 'Số lượng',
			dataIndex: 'quantity',
			key: 'quantity',
		},
		{
			title: 'Số tiền',
			dataIndex: 'total',
			key: 'total',
		},
		{
			title: 'Thao tác',
			key: 'action',
			render: (_, record) => (
				<div onClick={handleDeleteItem} className="cursor-pointer hover:[&>*]:text-blue-500">
					<Title text={'Xóa'} level={5} isNormal />
				</div>
			),
		},
	];

	const records: DataType[] = [
		{
			key: '1',
			name: 'John Brown',
			unitPrice: 'New York No. 1 Lake Park',
			quantity: 1,
			total: 100,
		},
		{
			key: '2',
			name: 'Jim Green',
			unitPrice: 'London No. 1 Lake Park',
			quantity: 1,
			total: 100,
		},
		{
			key: '3',
			name: 'Joe Black',
			unitPrice: 'Sydney No. 1 Lake Park',
			quantity: 1,
			total: 100,
		},
	];

	return (
		<div>
			<Title className="text-primary" text={'Giỏ hàng'} />

			<Table columns={columns} dataSource={records} className="mt-10" pagination={false} />

			<Row gutter={24} align={'middle'} className="mt-10" justify={'end'}>
				<Col>
					<Row align={'middle'} gutter={16}>
						<Col>
							<Title level={4} isNormal text={`Tổng thanh toán (3 sản phẩm):`} />
						</Col>

						<Col>
							<Title className="text-primary" level={3} isNormal text={`26.999 VNĐ`} />
						</Col>
					</Row>
				</Col>

				<Col>
					<Button
						onClick={handlePayment}
						size="large"
						type="primary"
						text="Mua hàng"
						className="min-w-[200px]"
					/>
				</Col>
			</Row>
		</div>
	);
};

export default ProductModule;
