import AddingNewProduct from './components/AddingNewProduct'
import ProductTable from './components/ProductTable'

const ProductManagement: React.FC = () => {
  return (
    <div>
      <AddingNewProduct />

      <ProductTable />
    </div>
  )
}

export default ProductManagement
