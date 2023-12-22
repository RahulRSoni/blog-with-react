import React, { useState } from 'react';
import authServices from '../../appwrite_backend/authService.js';
import { Link, useNavigate } from 'react-router-dom';
import { logIn } from '../../store/authSlice.js';
import { Button, Input, Logo } from '../index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function SignUp() {
	const navigate = useNavigate();
	const [error, setError] = useState('');
	const dispatch = useDispatch();
	const { register, handleSubmit } = useForm();

	const createUser = async (data) => {
		console.log(data);
		setError('');
		try {
			const userData = await authServices.createAccount(data);
			console.log(userData);
			if (userData) {
				const userData = await authServices.getCurrentUser();
				if (userData) dispatch(logIn(userData));
				navigate('/');
			}
		} catch (error) {
			setError(error?.message);
		}
	};

	return (
		<div className='flex items-center justify-center'>
			<div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl px-10 border border-black/10'>
				<div className='mb-2 flex justify-center'>
					<span className='inline-block w-full max-w-[100px]'>
						<Logo width='100%' />
					</span>
					<h2 className='text-center text-2xl font-bold leading-tight'>
						Sign up to create account
					</h2>
					<p className='mt-2 text-center text-base text-black/60'>
						Already have an account?&nbsp;
						<Link
							to='/login'
							className='font-medium text-primary transition-all duration-200 hover:underline'>
							Sign In
						</Link>
					</p>
					{error && <p className='text-red-500 mt-8 text-center'>{error}</p>}
					<from
						onSubmit={handleSubmit(create)}
						className='mt-8'>
						<div className='space-y-5'>
							<input
								label='Full Name:'
								placeholder='Enter Your full name'
								type='text'
								{...register('name ', {
									required: true,
								})}
							/>
							<input
								label='Email:'
								placeholder='Enter Your email Id'
								type='email'
								{...register('email', {
									required: true,
									validate: {
										matchPattern: (value) =>
											/^\w+([.-]?\w+)+@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
												value,
											) || 'Email address must be a valid address',
									},
								})}
							/>
							<Input
								label='Password'
								type='password'
								placeholder='Enter your password'
								{...register('password', { required: true })}
							/>
							<Button
								type='submit'
								className='w-full'>
								Create Account
							</Button>
						</div>
					</from>
				</div>
			</div>
		</div>
	);
}

export default SignUp;