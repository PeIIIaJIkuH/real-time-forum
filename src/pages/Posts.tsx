import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonRow} from '@ionic/react'
import {FC, useEffect} from 'react'
import appState from '../store/appState'
import {IPost} from '../types'

const posts: IPost[] = [{
	id: '1',
	authorId: '1',
	title: 'Post 1',
	content: 'Content 1',
	categories: [{id: '1', text: 'text'}, {id: '2', text: 'about'}],
	comments: [],
	creationDate: new Date()
}, {
	id: '2', authorId: '1', title: 'Post 2', content: 'Content 2', categories: [], comments: [], creationDate: new Date()
}]

export const Posts: FC = () => {
	useEffect(() => {
		appState.setTitle('Posts')
	}, [])

	return (
		<IonGrid fixed>
			{posts.map(post => (
				<IonRow key={post.id}>
					<IonCol>
						<IonCard>
							<IonCardHeader>
								<IonCardTitle>{post.title}</IonCardTitle>
								<IonCardSubtitle>{post.authorId}</IonCardSubtitle>
							</IonCardHeader>
							<IonCardContent>{post.content}</IonCardContent>
						</IonCard>
					</IonCol>
				</IonRow>
			))}
		</IonGrid>
	)
}
