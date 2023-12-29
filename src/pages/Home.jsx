import React, { useEffect, useState } from 'react';
import services from '../appwrite_backend/dbService.js';
import { Container, Card } from '../components/index.js';

function Home() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		services.getPost(posts).then((post) => {
			if (post) {
				setPosts(post.documents);
			}
		});
	}, []);

	if (posts.length === 0) {
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
						{posts.map((post) => (
							<div
								key={post.$id}
								className='p-2 w-1/4'>
								<Card {...post} />
							</div>
						))}
					</div>
				</Container>
			</div>
		);
	}
}

export default Home;
