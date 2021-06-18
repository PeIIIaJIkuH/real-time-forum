import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonLabel, IonRow} from '@ionic/react'
import {observer} from 'mobx-react-lite'
import {FC} from 'react'
import {useHistory} from 'react-router'
import {IPost} from '../types'

interface Props {
	post: IPost
	href?: string
	clickable?: boolean
}

export const Post: FC<Props> = observer(({post, href, clickable}) => {
	const history = useHistory()

	const onClick = () => {
		if (clickable) {
			history.push(`/posts/${post.id}`)
		}
	}

	return <>
		<IonRow>
			<IonCol>
				<IonCard onClick={onClick}>
					<IonCardHeader>
						<IonCardTitle>{post?.title || 'Title'}</IonCardTitle>
						<IonCardSubtitle>{post?.author?.username || 'Username'}</IonCardSubtitle>
					</IonCardHeader>
					<IonCardContent>
						<IonLabel>
							{post?.content || 'Content'}
						</IonLabel>
						<br/>
					</IonCardContent>
				</IonCard>
			</IonCol>
		</IonRow>
	</>
})
