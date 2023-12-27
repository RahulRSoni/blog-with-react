import React, { useEffect, useState } from 'react';
import { services } from 'appwrite/types/service';
import { Container, Card } from '../components/index.js';

function Home() {
	const [post, setPost] = useState([]);

	useEffect(() => {
		services.getPost().then((posts) => {
			if (posts) {
				setPost(posts.documents);
			}
		});
	}, []);

	if (post.length === 0) {
		return (
			<div className='w-full py-8 mt-4 text-center'>
				<Container>
					<div className='flex flex-wrap'>
						<div className='text-2xl'>
							<h1 className='text-2xl font-bold hover:text-gray-500'>
								Login to read posts
							</h1>
						</div>
					</div>
				</Container>
			</div>
		);
	} else {
		return (
			<div className='w-full py-8'>
				<Container>
					<div className='flex flex-wrap'>
						{post.map((post) => {
							<div
								key={post.$id}
								className='p-2 w-1/4'>
								<Card post={post} />
							</div>;
						})}
					</div>
				</Container>
			</div>
		);
	}
}

export default Home;
