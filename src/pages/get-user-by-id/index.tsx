import MainLayout from '@/src/layouts/MainLayout/MainLayout';
import mainAxios from '@/src/libs/main-axios';
import { useAppSelector } from '@/src/redux/hooks';
import { getIsAuthenticated } from '@/src/redux/slices/authSlice';
import { useEffect } from 'react';

const DemoPage = () => {
	const isAuthenticated = useAppSelector(getIsAuthenticated);

	useEffect(() => {
		if (!isAuthenticated) return;

		(async () => {
			try {
				const res = await mainAxios.get(`http://localhost:3002/users/01GVVY66XWQ35R284RHWWERZB3`);
				console.log('res', res);
			} catch (error) {
				console.log('error', error);
			}
		})();
	}, []);

	return (
		<MainLayout>
			<div>get user by id</div>
		</MainLayout>
	);
};

export default DemoPage;
