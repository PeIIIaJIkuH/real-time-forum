import {
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonCol,
	IonIcon,
	IonLabel,
	IonRow,
} from '@ionic/react'
import {chatboxOutline} from 'ionicons/icons'
import {observer} from 'mobx-react-lite'
import {FC} from 'react'
import {useHistory} from 'react-router'
import {IPost} from '../../types'
import s from './Post.module.css'
import {getTime} from '../../utils/helpers'

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

	return (
		<IonRow>
			<IonCol>
				<IonCard onClick={onClick}>
					{post && <>
						<IonCardHeader>
							<IonCardTitle className='break-word'>{post?.title}</IonCardTitle>
							<IonCardSubtitle>
								<div className={s.subtitle}>
									<div>{post.author.username}</div>
									<div>{getTime(post.createdAt, true)}</div>
								</div>
							</IonCardSubtitle>
						</IonCardHeader>
						<IonCardContent>
							<IonLabel>
								<div className='break-word'>{post.content || 'Content'}</div>
							</IonLabel>
							<IonLabel>
								<div className={s.footer}>
									<div className={s.categories}>
										{post.categories.map(category => (
											<div key={category.id} className={s.tag}>
												{category.name}
											</div>
										))}
									</div>
									<div className={s.comments}>
										<IonIcon icon={chatboxOutline} className={s.icon}/>
										{post.commentsNumber}
									</div>
								</div>
							</IonLabel>
						</IonCardContent>
					</>}
				</IonCard>
			</IonCol>
		</IonRow>
	)
})
