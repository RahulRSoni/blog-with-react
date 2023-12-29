import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, RealTimeEditor } from '../index';
import services from '../../appwrite_backend/dbService';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PostForm = ({ post }) => {
	// console.log(post);
	const navigate = useNavigate();
	const userData = useSelector((state) => state.userData);

	const { register, handleSubmit, watch, setValue, control, getValues } =
		useForm({
			defaultValues: {
				title: post?.title || '',
				slug: post?.slug || '',
				content: post?.content || '',
				status: post?.status || 'active',
				featuredImage: post?.featuredImage || '',
			},
		});
	const submit = async (data) => {
		if (post) {
			const file = data.image[0]
				? await services.uploadFile(data.image[0])
				: null;

			if (file) {
				await services.deleteFile(file.$id);
			}
			const dbPost = await services.updatePost(post.$id, {
				...data,
				featuredImage: file ? file.$id : undefined,
			});

			if (dbPost) {
				navigate(`/post/${dbPost.$id}`);
			}
		} else {
			const file = data.image[0]
				? await services.uploadFile(data.image[0])
				: null;

			if (file) {
				const fileId = file.$id;
				data.featuredImage = fileId;
				const dbPost = await services.createPost({
					...data,
					userId: userData.$id,
				});
				if (dbPost) {
					navigate(`/post/${dbPost.$id}`);
				}
			}
		}
	};

	const slugTransform = useCallback((value) => {
		if (value && typeof value === 'string')
			return value.trim().toLowerCase().replace(/\s/g, '-');

		return '';
	}, []);

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			if (name === 'title') {
				setValue('slug', slugTransform(value.title), { shouldValidate: true });
			}
		});
		return () => {
			subscription.unsubscribe();
		};
	}, [watch, slugTransform, setValue]);

	return (
		<form
			onSubmit={handleSubmit(submit)}
			className='flex flex-wrap '>
			<div className='w-2/3 px-2'>
				<Input
					label='Title :'
					placeholder='Title'
					name='title'
					{...register('title', { required: true })}
				/>
				<Input
					label='Slug :'
					placeholder='Slug'
					name='slug'
					{...register('slug', { required: true })}
					onInput={(e) => {
						setValue('slug', slugTransform(e.target.value), {
							shouldValidate: true,
						});
					}}
				/>
				<RealTimeEditor
					label='Content :'
					name='content'
					control={control}
					defaultValue={getValues('content')}
				/>
			</div>
			<div className='w-1/3 px-2'>
				<Input
					label='Featured Image :'
					type='file'
					accept='image/png, image/jpg, image/jpeg, image/gif'
					{...register('image', { required: !post })}
				/>
				{post && (
					<div className='w-full mb-4'>
						<img
							src={services.getFilePreview(post.featuredImage)}
							alt={post.title}
							className='rounded-lg'
						/>
					</div>
				)}
				<Select
					options={['active', 'inactive']}
					label='Status'
					{...register('status', { required: true })}
				/>
				<Button
					type='submit'
					bgColor={post ? 'bg-green-500' : undefined}
					className='w-full'>
					{post ? 'Update' : 'Submit'}
				</Button>
			</div>
		</form>
	);
};

export default PostForm;
