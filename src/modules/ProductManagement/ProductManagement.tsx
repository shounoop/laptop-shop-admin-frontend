import AddingNewProduct from './components/AddingNewProduct/AddingNewProduct';
import ProductTable from './components/ProductTable/ProductTable';

const ProductManagement: React.FC = () => {
	return (
		<div>
			<AddingNewProduct />

			<ProductTable />
		</div>
	);
};

export default ProductManagement;
