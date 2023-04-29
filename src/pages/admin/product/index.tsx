import AdminLayout from '@/src/layouts/AdminLayout/AdminLayout';
import ProductManagement from '@/src/modules/AdminModule/ProductManagement';

const ProductManagementPage = () => {
	return (
		<AdminLayout>
			<ProductManagement />
		</AdminLayout>
	);
};

export default ProductManagementPage;
