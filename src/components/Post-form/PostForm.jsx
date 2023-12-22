import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, RTE } from '../index';
import appwriteServices from '../../appwrite_backend/dbService';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PostForm = ({ post }) => {
	const navigate = useNavigate();
	const userData = useSelector((state) => state.user.userData);
	const { register, handleSubmit, watch, setValue, control, getValues } =
		useForm({
			defaultValues: {
				title: post?.title || '',
				slug: post?.slug || '',
				content: post?.content || '',
				status: post?.status || 'active',
			},
		});
	const submit = async (data) => {
		if (post) {
			const file = data.image[0]
				? appwriteServices.uploadFile(data.image[0])
				: null;
			if (file) {
				appwriteServices.deleteFile(post.featuredImage);
			}
			const dbPost = await appwriteServices.updatePost(post.$id, {
				...data,
				featuredImage: file ? file.$id : undefined,
			});
			if (dbPost) {
				navigate(`/post/${dbPost.$id}`);
			}
		} else {
			const file = data.image[0].uploadFile(data.image[0]);

			if (file) {
				const fileId = file.$id;
				data.featuredImage = fileId;
				const dbPost = await appwriteServices.createPost({
					...data,
					userId: userData.id,
				});
				if (dbPost) {
					navigate(`/post/${dbPost.$id}`);
				}
			}
		}
	};

	const slugTransform = useCallback((value) => {
		if (value && typeof value === String)
			return value
				.trim()
				.toLowerCase()
				.replace(/^[a-zA-Z\d\s]+/g, '-')
				.replace(/\s/g, '-');

		return '';
	}, []);

	useEffect(() => {}, []);
};

export default PostForm;
