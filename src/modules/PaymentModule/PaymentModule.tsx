import mainAxios from '@/src/libs/main-axios';
import { Button, Result } from 'antd';
import { useRouter } from 'next/router';

const PaymentModule: React.FC = () => {
	const router = useRouter();

	const handleConfirmPayment = async () => {
		if (!router?.query?.PayerID) return;

		const payload = {
			payer_id: router?.query?.PayerID,
		};

		const res = await mainAxios.post(
			`https://api.sandbox.paypal.com/v1/payments/payment/PAYID-MRCUBSA3XC892546A179040K/execute`,
			payload
		);
	};

	return (
		<div>
			<Result
				status="success"
				title="Bấm xác nhận để hoàn tất thanh toán"
				subTitle={`Payment Id: ${router?.query?.PayerID}`}
				extra={[
					<Button size="large" type="primary" key="console">
						Xác nhận
					</Button>,
					<Button size="large" key="buy">
						Hủy
					</Button>,
				]}
			/>
		</div>
	);
};

export default PaymentModule;
