import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authServices from './appwrite_backend/authservice';
import { logIn, logOut } from './store/authSlice';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import { Outlet } from 'react-router-dom';

function App() {
	const [loading, setLoading] = useState(true);
	useSelector((state) => state.userData);
	const dispatch = useDispatch();
	useEffect(() => {
		authServices
			.getCurrentUser()
			.then((userData) => {
				if (userData) {
					dispatch(logIn(userData));
				} else {
					dispatch(logOut());
				}
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return !loading ? (
		<div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
			<div className='w-full block'>
				<Header />
				<main>
					<Outlet />
				</main>
				<Footer />
			</div>
		</div>
	) : (
		<div></div>
	);
}

export default App;
