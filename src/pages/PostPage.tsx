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
	IonRefresher,
	IonRefresherContent,
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
import postState from '../store/postState'
import {CreateComment} from './CreateComments'
import {NotFound} from './errors/NotFound'
import postsState from '../store/postsState'

export const PostPage: FC = observer(() => {
	const id = useParams<{ id: string }>().id,
		[isOpen, setIsOpen] = useState(false)

	const openModal = () => {
		setIsOpen(true)
	}

	const closeModal = () => {
		setIsOpen(false)
	}

	const refreshData = async (e: any) => {
		await postState.fetchPost(id)
		await postState.fetchComments(id)
		e.detail.complete()
	}

	useEffect(() => {
		postState.fetchData(id).then()
	}, [id])

	useEffect(() => {
		return () => {
			postState.setPost(null)
			postState.setComments([])
			postsState.setLastPostId(0)
			postsState.setCompleted(false)
			postsState.setPosts([])
		}
	}, [])

	if (postState.postError) {
		return <NotFound/>
	}

	return (
		<IonPage>
			<Header title='Post' backButton={<IonBackButton/>}/>
			<Content>
				<IonRefresher slot='fixed' onIonRefresh={refreshData}>
					<IonRefresherContent/>
				</IonRefresher>
				<IonFab vertical='bottom' horizontal='end' slot='fixed'>
					<IonFabButton onClick={openModal} disabled={!authState.user}>
						<IonIcon icon={chatboxOutline} size='large'/>
					</IonFabButton>
				</IonFab>
				<IonGrid fixed>
					<Post post={postState.post!}/>
					<IonList>
						<IonListHeader>
							<h3>{postState.comments ? 'Comments' : 'No Comments'}</h3>
						</IonListHeader>
						{postState.comments?.map(comment => (
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
