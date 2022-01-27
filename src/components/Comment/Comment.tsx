import {IonItem, IonLabel} from '@ionic/react'
import {FC} from 'react'
import {IComment} from '../../types'
import s from './Comment.module.css'
import {getTime} from '../../utils/helpers'

interface Props {
	comment: IComment
}

export const Comment: FC<Props> = ({comment}) => {
	console.log(comment.content)
	return (
		<IonItem>
			<IonLabel>
				{comment && <>
					<div className={s.title}>
						<h5>{comment.author.username}</h5>
						<h6>{getTime(comment.createdAt)}</h6>
					</div>
					<div className='break-word'>
						{comment.content.split('\n').map(text => (
							<p>{text}</p>
						))}
					</div>
				</>}
			</IonLabel>
		</IonItem>
	)
}
