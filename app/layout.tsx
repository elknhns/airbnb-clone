import { Nunito } from 'next/font/google';

import Navbar from './components/navbar/Navbar';
import RegisterModal from './components/modals/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';
import './globals.css';

type RootLayoutProps = { children: React.ReactNode };

export const metadata = { title: 'Airbnb', description: 'Airbnb Clone' };

const nunito = Nunito({ subsets: ['latin'] });

const RootLayout = ({ children }: RootLayoutProps) => (
	<html lang='en'>
		<body className={nunito.className}>
			<ToasterProvider />
			<RegisterModal />
			<Navbar />
			{children}
		</body>
	</html>
);

export default RootLayout;
