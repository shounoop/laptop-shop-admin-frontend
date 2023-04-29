import mainAxios from '@/src/libs/main-axios';
import { Button, Input, Modal } from 'antd';
import { useState } from 'react';
import { setCookie } from '@/src/utils/cookie';
import LOCAL_STORAGE_KEY from '@/src/shared/local-storage-key';
import { isAuthenticatedJwt } from '@/src/utils/jwt';
import { useAppDispatch } from '@/src/redux/hooks';
import { setIsAuthenticated } from '@/src/redux/slices/authSlice';

interface LoginRes {
	access_token?: string | any;
	expires_in?: number | any;
	scope?: string | any;
	token_type?: string | any;
}

interface Props {
	visible?: boolean;
	setVisible: (value: boolean) => void;
}

const LoginModal: React.FC<Props> = (props) => {
	const { visible = false, setVisible } = props;

	const dispatch = useAppDispatch();

	const [username, setUsername] = useState('phungtanminh01+2@gmail.com');
	const [password, setPassword] = useState('Minh12345@');

	const handleOk = () => {
		setVisible(false);
	};

	const handleCancel = () => {
		setVisible(false);
	};

	const handleLogin = () => {
		(async () => {
			try {
				const res: LoginRes = await mainAxios.post(`http://localhost:3002/users/login`, {
					username,
					password,
				});

				if (res?.access_token) {
					const token = res.access_token;

					setCookie(LOCAL_STORAGE_KEY.TOKEN, token, 365);

					if (isAuthenticatedJwt(token)) {
						dispatch(setIsAuthenticated(true));
						setVisible(false);
					}
				}
			} catch (error) {
				console.log(error);
			}
		})();
	};

	return (
		<Modal title="Login" open={visible} onOk={handleOk} onCancel={handleCancel} footer={null}>
			<Input
				placeholder="Username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				style={{ marginTop: 10 }}
			/>

			<Input.Password
				placeholder="Password"
				style={{ marginTop: 8, marginBottom: 10 }}
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>

			<Button type="primary" onClick={handleLogin}>
				Login
			</Button>
		</Modal>
	);
};

export default LoginModal;
