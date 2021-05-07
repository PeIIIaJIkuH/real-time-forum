import {
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonCol,
	IonContent,
	IonGrid,
	IonHeader,
	IonPage,
	IonRow,
	IonTitle,
	IonToolbar
} from '@ionic/react'
import {FC} from 'react'
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
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar className='ion-text-center'>
					<IonTitle>Posts</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
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
			</IonContent>
		</IonPage>
	)
}
