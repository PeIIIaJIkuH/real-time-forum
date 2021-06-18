import {IonFab, IonFabButton, IonGrid, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonModal, IonPage} from '@ionic/react'
import {addOutline} from 'ionicons/icons'
import {observer} from 'mobx-react-lite'
import {FC, useEffect, useState} from 'react'
import {Content} from '../components/Content/Content'
import {Header} from '../components/Header'
import {Post} from '../components/Post'
import authState from '../store/authState'
import postsState from '../store/postsState'
import postsStore from '../store/postsState'
import {CreatePost} from './CreatePost'

export const Posts: FC = observer(() => {
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		postsStore.fetchAllPosts().then()
	}, [])

	const openModal = () => {
		setIsOpen(true)
	}

	const closeModal = () => {
		setIsOpen(false)
	}

	const onInfinite = async (e: any) => {
		await postsState.fetchAllPosts()
		e.target!.complete!()
	}

	return (
		<IonPage>
			<Header title='Posts'/>
			<Content>
				<IonFab vertical='bottom' horizontal='end' slot='fixed'>
					<IonFabButton onClick={openModal} disabled={!authState.user}>
						<IonIcon icon={addOutline} size='large'/>
					</IonFabButton>
				</IonFab>
				<IonModal isOpen={isOpen}>
					<CreatePost closeModal={closeModal}/>
				</IonModal>
				<IonGrid fixed>
					{postsStore.posts?.map(post => (
						<Post post={post} key={post.id} clickable/>
					))}
					<IonInfiniteScroll threshold='100px' onIonInfinite={onInfinite} disabled={postsState.completed}>
						<IonInfiniteScrollContent/>
					</IonInfiniteScroll>
				</IonGrid>
			</Content>
		</IonPage>
	)
})
