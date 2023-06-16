import { Inter, Nunito } from 'next/font/google';

import Navbar from './components/Navbar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Airbnb',
	description: 'Airbnb Clone',
};

const nunito = Nunito({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={nunito.className}>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
