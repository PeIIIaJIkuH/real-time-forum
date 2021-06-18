import {IonItem, IonLabel} from '@ionic/react'
import {FC} from 'react'
import {IComment} from '../types'

interface Props {
	comment: IComment
}

export const Comment: FC<Props> = ({comment}) => {
	const date = new Date(comment.createdAt * 1000)

	return (
		<IonItem>
			<IonLabel>
				<h3>{comment.author.username}</h3>
				<h4>{date.toLocaleString()}</h4>
				<p>{comment.content}</p>
			</IonLabel>
		</IonItem>
	)
}
