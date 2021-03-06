import {RefresherEventDetail} from '@ionic/core'
import {
	IonFab,
	IonFabButton,
	IonGrid,
	IonIcon,
	IonInfiniteScroll,
	IonInfiniteScrollContent,
	IonModal,
	IonPage,
	IonRefresher,
	IonRefresherContent,
} from '@ionic/react'
import {addOutline} from 'ionicons/icons'
import {observer} from 'mobx-react-lite'
import {FC, useEffect, useState} from 'react'
import {Content} from '../../components/Content/Content'
import {Header} from '../../components/Header'
import {Post} from '../../components/Post/Post'
import authState from '../../store/authState'
import postsState from '../../store/postsState'
import {CreatePost} from '../CreatePost/CreatePost'
import s from './Posts.module.css'

export const Posts: FC = observer(() => {
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		postsState.fetchPosts().then()
	}, [])

	const openModal = () => {
		setIsOpen(true)
	}

	const closeModal = () => {
		setIsOpen(false)
	}

	const onInfinite = async (e: any) => {
		await postsState.fetchPosts()
		e.target!.complete()
	}

	const refreshPosts = async (e: CustomEvent<RefresherEventDetail>) => {
		await postsState.refreshPosts()
		e.detail.complete()
	}

	return (
		<IonPage>
			<Header title='Posts'/>
			<Content>
				<IonRefresher slot='fixed' onIonRefresh={refreshPosts}>
					<IonRefresherContent/>
				</IonRefresher>
				<IonFab vertical='bottom' horizontal='end' slot='fixed'>
					<IonFabButton onClick={openModal} disabled={!authState.user}>
						<IonIcon icon={addOutline} size='large'/>
					</IonFabButton>
				</IonFab>
				<IonModal isOpen={isOpen}>
					<CreatePost closeModal={closeModal}/>
				</IonModal>
				<IonGrid fixed>
					{postsState.posts?.map(post => (
						<Post post={post} key={post.id} clickable/>
					))}
					{postsState.posts.length === 0 && (
						<div className={s.noPosts}>
							<div>No posts</div>
							<div>Be first to write something</div>
						</div>
					)}
					<IonInfiniteScroll threshold='50px' onIonInfinite={onInfinite} disabled={postsState.completed}>
						<IonInfiniteScrollContent/>
					</IonInfiniteScroll>
				</IonGrid>
			</Content>
		</IonPage>
	)
})
