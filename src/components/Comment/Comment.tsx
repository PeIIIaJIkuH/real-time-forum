import {IonItem, IonLabel} from '@ionic/react'
import {FC} from 'react'
import {IComment} from '../../types'
import s from './Comment.module.css'

interface Props {
	comment: IComment
}

export const Comment: FC<Props> = ({comment}) => {
	const date = new Date(comment.createdAt * 1000)

	return (
		<IonItem>
			<IonLabel>
				<div className={s.title}>
					<h5>{comment.author.username}</h5>
					<h6>{date.toLocaleString()}</h6>
				</div>
				<p>{comment.content}</p>
			</IonLabel>
		</IonItem>
	)
}
