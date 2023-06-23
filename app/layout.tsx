import { Nunito } from 'next/font/google';

import getCurrentUser from './actions/getCurrentUser';
import LoginModal from './components/modals/LoginModal';
import Navbar from './components/navbar/Navbar';
import RegisterModal from './components/modals/RegisterModal';
import RentModal from './components/modals/RentModal';
import ToasterProvider from './providers/ToasterProvider';
import './globals.css';

type RootLayoutProps = { children: React.ReactNode };

export const metadata = { title: 'Airbnb', description: 'Airbnb Clone' };

const nunito = Nunito({ subsets: ['latin'] });

export default async function RootLayout({ children }: RootLayoutProps) {
	const currentUser = await getCurrentUser();

	return (
		<html lang='en'>
			<body className={nunito.className}>
				<ToasterProvider />
				<RegisterModal />
				<LoginModal />
				<RentModal />
				<Navbar currentUser={currentUser} />
				{children}
			</body>
		</html>
	);
}