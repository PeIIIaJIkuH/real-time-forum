import {
	IonBackButton,
	IonFab,
	IonFabButton,
	IonGrid,
	IonIcon,
	IonList,
	IonListHeader,
	IonModal,
	IonPage,
} from '@ionic/react'
import {chatboxOutline} from 'ionicons/icons'
import {observer} from 'mobx-react-lite'
import {FC, useEffect, useState} from 'react'
import {useParams} from 'react-router'
import {Comment} from '../components/Comment/Comment'
import {Content} from '../components/Content/Content'
import {Header} from '../components/Header'
import {Post} from '../components/Post/Post'
import authState from '../store/authState'
import postsState from '../store/postState'
import {CreateComment} from './CreateComments'
import {NotFound} from './errors/NotFound'

export const PostPage: FC = observer(() => {
	const id = useParams<{ id: string }>().id,
		[isOpen, setIsOpen] = useState(false)

	const openModal = () => {
		setIsOpen(true)
	}

	const closeModal = () => {
		setIsOpen(false)
	}

	useEffect(() => {
		postsState.fetchData(id).then()
	}, [id])

	useEffect(() => {
		return () => {
			postsState.setPost(null)
			postsState.setComments([])
		}
	}, [])

	if (postsState.postError) {
		return <NotFound/>
	}

	return (
		<IonPage>
			<Header title='Post' backButton={<IonBackButton/>}/>
			<Content>
				<IonFab vertical='bottom' horizontal='end' slot='fixed'>
					<IonFabButton onClick={openModal} disabled={!authState.user}>
						<IonIcon icon={chatboxOutline} size='large'/>
					</IonFabButton>
				</IonFab>
				<IonGrid fixed>
					<Post post={postsState.post!}/>
					<IonList>
						<IonListHeader>
							<h3>{postsState.comments ? 'Comments' : 'No Comments'}</h3>
						</IonListHeader>
						{postsState.comments?.map(comment => (
							<Comment comment={comment} key={comment.id}/>
						))}
					</IonList>
				</IonGrid>
				<IonModal isOpen={isOpen}>
					<CreateComment closeModal={closeModal} postId={id}/>
				</IonModal>
			</Content>
		</IonPage>
	)
})
