import {IonItem, IonLabel} from '@ionic/react'
import moment from 'moment'
import {FC} from 'react'
import {IComment} from '../../types'
import s from './Comment.module.css'

interface Props {
	comment: IComment
}

export const Comment: FC<Props> = ({comment}) => {
	return (
		<IonItem>
			<IonLabel>
				{comment && <>
					<div className={s.title}>
						<h5>{comment.author.username}</h5>
						<h6>{moment(comment.createdAt * 1000).calendar()}</h6>
					</div>
					<p>{comment.content}</p>
				</>}
			</IonLabel>
		</IonItem>
	)
}
