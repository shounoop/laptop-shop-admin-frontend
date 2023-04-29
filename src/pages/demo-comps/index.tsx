import { SectionButton, SectionInput, SectionSwitch, Title } from '@/src/components';
import MainLayout from '@/src/layouts/MainLayout/MainLayout';
import type { NextPage } from 'next';
import Head from 'next/head';

const DemoComponents: NextPage = () => {
	return (
		<MainLayout>
			<Head>
				<title>Antd + Tailwindcss + SCSS</title>
			</Head>

			<main className="p-4 md:p-11">
				<Title text="Title level 1" />
				<Title text="Title level 2" level={2} />

				<SectionButton />

				<SectionInput />

				<SectionSwitch />
			</main>
		</MainLayout>
	);
};

export default DemoComponents;
