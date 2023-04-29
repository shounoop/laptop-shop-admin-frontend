import MainLayout from '../layouts/MainLayout/MainLayout';
import HomePage from '../modules/Home';
import Head from 'next/head';

export default function Home() {
	return (
		<MainLayout>
			<Head>
				<title>Laptop Shop</title>
				<meta
					name="description"
					content="Welcome to our professional laptop store. We offer a range of high-quality laptop products from top brands around the world such as Apple, Dell, Lenovo, Asus, and many others. Our customers will find the best options for configuration, size, color, and price. We are committed to providing you with quality products, competitive prices, and excellent customer service. Visit our website for more details and place your order today!"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<HomePage />
		</MainLayout>
	);
}
