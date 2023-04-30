import AddingNewProduct from './components/AddingNewUser/AddingNewUser';
import UserTable from './components/UserTable/UserTable';

const UserManagement: React.FC = () => {
	return (
		<div>
			<AddingNewProduct />

			<UserTable />
		</div>
	);
};

export default UserManagement;
