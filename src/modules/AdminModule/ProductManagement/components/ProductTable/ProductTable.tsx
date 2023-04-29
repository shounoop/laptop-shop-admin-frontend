import { Button, Title } from '@/src/components';
import mainAxios from '@/src/libs/main-axios';
import { Col, Row, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import UpdatingProduct from '../UpdatingProduct';

interface RecordType {
	key: number;
	productName: string;
	price: number;
	description: string;
	photoUrl: string;
	quantity: number;
	type: string;
	action?: {
		productId?: string;
	};
}

interface Props {}

const ProductTable: React.FC<Props> = (props) => {
	// useState
	const [products, setProducts] = useState<any[]>();
	const [records, setRecords] = useState<RecordType[]>();

	// useEffect
	useEffect(() => {
		(async () => {
			try {
				const res: any = await mainAxios.get(`http://localhost:3004/products`);

				setProducts(res);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	useEffect(() => {
		if (!products) return;

		const newRecords = products.map((product) => ({
			key: 1,
			productName: product.productName,
			price: product.price,
			description: product.description,
			photoUrl: product.photoUrl,
			quantity: product.quantity,
			type: product.type,
			action: { productId: product.productId },
		}));

		setRecords(newRecords);
	}, [products]);

	// functions
	const handleDelete = async (productId: string | undefined) => {
		if (!productId) {
			return;
		}

		try {
			await mainAxios.delete(`http://localhost:3004/products/${productId}`);

			const newProducts = products?.filter((item) => item.productId !== productId);

			setProducts(newProducts);
		} catch (error) {
			console.log(error);
		}
	};

	// columns of table
	const columns: ColumnsType<RecordType> = [
		{
			title: 'Tên sản phẩm',
			dataIndex: 'productName',
			key: 'productName',
			render: (text) => <a>{text}</a>,
		},
		{
			title: 'Giá',
			dataIndex: 'price',
			key: 'price',
		},
		{
			title: 'Mô tả',
			dataIndex: 'description',
			key: 'description',
		},
		{
			width: 200,
			title: 'Ảnh (url)',
			// dataIndex: 'photoUrl',
			key: 'photoUrl',
		},
		{
			title: 'Số lượng',
			dataIndex: 'quantity',
			key: 'quantity',
		},
		{
			title: 'Kiểu',
			dataIndex: 'type',
			key: 'type',
		},
		{
			title: 'Thao tác',
			dataIndex: 'action',
			key: 'action',
			render: (_, record) => {
				return (
					<Row gutter={16} wrap={false}>
						<Col onClick={() => handleDelete(record?.action?.productId)}>
							<Button type="primary" text={'Xóa'} />,
						</Col>

						<Col>
							<UpdatingProduct oldData={record} />
						</Col>
					</Row>
				);
			},
		},
	];

	return (
		<div>
			<Table
				columns={columns}
				dataSource={records}
				className="mt-10"
				pagination={false}
				scroll={{ x: 'max-content' }}
			/>
		</div>
	);
};

export default ProductTable;
