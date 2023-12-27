import React, { useEffect, useState } from 'react';
import services from '../appwrite_backend/dbService';
import { Container, Card } from '../components/index';

function AllPost() {
	const [post, setPost] = useState([]);
	useEffect(() => {
		services.getPost([]).then((posts) => {
			if (posts) {
				setPost(posts.documents);
			}
		});
	}, []);

	return (
		<div className='w-full py-8'>
			<Container>
				<div className='flex flex-wrap'>
					{post.map((post) => (
						<div
							key={post.$id}
							className='p-2 w-1/4'>
							<Card post={post} />
						</div>
					))}
				</div>
			</Container>
		</div>
	);
}

export default AllPost;
