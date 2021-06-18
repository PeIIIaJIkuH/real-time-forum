import {IonBackButton, IonFab, IonFabButton, IonGrid, IonIcon, IonList, IonListHeader, IonModal, IonPage} from '@ionic/react'
import {chatboxEllipsesOutline} from 'ionicons/icons'
import {observer} from 'mobx-react-lite'
import {FC, useEffect, useState} from 'react'
import {useParams} from 'react-router'
import {Comment} from '../components/Comment'
import {Content} from '../components/Content/Content'
import {Header} from '../components/Header'
import {Post} from '../components/Post'
import authState from '../store/authState'
import postStore from '../store/postState'
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
		postStore.fetchData(id).then()
	}, [id])

	useEffect(() => {
		return () => {
			postStore.setPost(null)
			postStore.setComments(null)
		}
	}, [])

	if (postStore.postError) {
		return <NotFound/>
	}

	return (
		<IonPage>
			<Header title='Post' backButton={<IonBackButton/>}/>
			<Content>
				<IonFab vertical='bottom' horizontal='end' slot='fixed'>
					<IonFabButton onClick={openModal} disabled={!authState.user}>
						<IonIcon icon={chatboxEllipsesOutline} size='large'/>
					</IonFabButton>
				</IonFab>
				<IonGrid fixed>
					<Post post={postStore.post!}/>
					<IonList>
						<IonListHeader>Comments</IonListHeader>
						{postStore.comments?.map(comment => (
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
