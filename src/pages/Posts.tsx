import {
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonCol, IonContent,
	IonFab,
	IonFabButton,
	IonGrid,
	IonIcon,
	IonModal,
	IonPage,
	IonRow
} from '@ionic/react'
import {addOutline} from 'ionicons/icons'
import {FC, useState} from 'react'
import {CreatePostForm} from '../components/CreatePostForm'
import {Header} from '../components/Header'
import {IPost} from '../types'

const posts: IPost[] = [{
	id: '1',
	authorId: '1',
	title: 'Post 1',
	content: 'Content 1',
	categories: [{id: '1', text: 'text'}, {id: '2', text: 'about'}],
	comments: [],
	createdAt: Date.now()
}, {
	id: '2', authorId: '1', title: 'Post 2', content: 'Content 2', categories: [], comments: [], createdAt: Date.now()
}, {
	id: '3', authorId: '1', title: 'Post 3', content: 'Content 3', categories: [], comments: [], createdAt: Date.now()
}, {
	id: '4', authorId: '1', title: 'Post 4', content: 'Content 4', categories: [], comments: [], createdAt: Date.now()
}, {
	id: '5', authorId: '1', title: 'Post 5', content: 'Content 5', categories: [], comments: [], createdAt: Date.now()
}, {
	id: '6', authorId: '1', title: 'Post 6', content: 'Content 6', categories: [], comments: [], createdAt: Date.now()
}]

export const Posts: FC = () => {
	const [isOpen, setIsOpen] = useState(false)

	const openModal = () => {
		setIsOpen(true)
	}

	const closeModal = () => {
		setIsOpen(false)
	}

	return (
		<IonPage>
			<Header title='Posts'/>
			<IonContent>
				<IonFab vertical='bottom' horizontal='end' slot='fixed'>
					<IonFabButton onClick={openModal}>
						<IonIcon icon={addOutline} size='large'/>
					</IonFabButton>
				</IonFab>
				<IonModal isOpen={isOpen}>
					<CreatePostForm closeModal={closeModal}/>
				</IonModal>
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
