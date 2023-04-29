import mainAxios from '@/src/libs/main-axios';
import { Input, Row } from 'antd';
import { useState } from 'react';
import { setCookie } from '@/src/utils/cookie';
import LOCAL_STORAGE_KEY from '@/src/shared/local-storage-key';
import { isAuthenticatedJwt } from '@/src/utils/jwt';
import { useAppDispatch } from '@/src/redux/hooks';
import { setIsAuthenticated, setUserInfo } from '@/src/redux/slices/authSlice';
import { Button, Title } from '@/src/components';
import { useRouter } from 'next/router';

interface LoginRes {
	access_token?: string | any;
	expires_in?: number | any;
	scope?: string | any;
	token_type?: string | any;
	payload?: { userId: string; userType: 'sysadmin' | 'general' };
}

const LoginAdmin: React.FC = () => {
	const router = useRouter();

	const dispatch = useAppDispatch();

	const [username, setUsername] = useState('phungtanminh01+2@gmail.com');
	const [password, setPassword] = useState('Minh12345@');

	const handleLogin = () => {
		(async () => {
			try {
				const res: LoginRes = await mainAxios.post(`http://localhost:3002/users/login`, {
					username,
					password,
				});

				if (res?.payload) {
					dispatch(setUserInfo(res.payload));
				}

				router.push('/admin/product');

				// if (res?.access_token) {
				// 	const token = res.access_token;

				// 	setCookie(LOCAL_STORAGE_KEY.TOKEN, token, 365);

				// 	if (isAuthenticatedJwt(token)) {
				// 		dispatch(setIsAuthenticated(true));
				// 	}
				// }
			} catch (error) {
				console.log(error);
			}
		})();
	};

	return (
		<Row className="h-screen" align={'middle'} justify={'center'}>
			<div>
				<Row justify={'center'}>
					<Title level={3} text={'ADMIN'} />
				</Row>

				<Input
					placeholder={`Username`}
					className="mt-6"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>

				<Input
					className="mt-6"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder={`Username`}
					required
				/>

				<Row className="mt-6">
					<Button
						size="large"
						type="secondary"
						htmlType="submit"
						className="w-full"
						onClick={handleLogin}
						text="Đăng nhập"
					/>
				</Row>
			</div>
		</Row>
	);
};

export default LoginAdmin;
