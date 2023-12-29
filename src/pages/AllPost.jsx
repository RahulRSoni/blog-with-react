import React, { useEffect, useState } from 'react';
import services from '../appwrite_backend/dbService';
import { Container, Card } from '../components/index';

function AllPost() {
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		services.getPost([]).then((post) => {
			if (post) {
				setPosts(post.documents);
			}
		});
	}, []);

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

export default AllPost;
