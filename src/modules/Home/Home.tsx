import { useEffect, useState } from 'react';
import mainAxios from '@/src/libs/main-axios';
import { Button, Title } from '@/src/components';
import { Col, Input, Row, Select, SelectProps } from 'antd';
import LaptopItem from './components/LaptopItem';

const HomePage: React.FC = () => {
	const [laptops, setLaptops] = useState<any[]>();

	useEffect(() => {
		(async () => {
			try {
				const res: any = await mainAxios.get('http://localhost:3004/products');
				setLaptops(res);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	// functions

	// const options: SelectProps['options'] = [];

	// for (let i = 10; i < 36; i++) {
	// 	options.push({
	// 		value: i.toString(36) + i,
	// 		label: i.toString(36) + i,
	// 	});
	// }

	return (
		<div>
			<Row justify={'space-between'} align={'middle'} className="my-4">
				<Col>
					<Title level={4} text="Tất cả sản phẩm" />
				</Col>

				<Col>
					<Row gutter={16} wrap={false}>
						<Col>
							<Input className="min-w-[300px] border-0 p-2" placeholder="Nhập tên sản phẩm..." />
						</Col>

						<Col>
							<Button type="primary" className="h-full" text="Tìm kiếm" />
						</Col>
					</Row>
				</Col>

				{/* <Col>
					<Row align={'middle'} gutter={16} justify={'end'} className="mb-4">
						<Col>
							<Select
								size={'middle'}
								defaultValue="Tất cả"
								onChange={handleChange}
								options={options}
							/>
						</Col>

						<Col>
							<Button type="primary" className="min-w-[90.08px]" text="Lọc" />
						</Col>
					</Row>
				</Col> */}
			</Row>

			<Row gutter={[24, 24]} className="mt-6">
				{laptops &&
					laptops?.map((item, index) => (
						<Col span={8} key={index}>
							<LaptopItem data={item} />
						</Col>
					))}
			</Row>
		</div>
	);
};

export default HomePage;
