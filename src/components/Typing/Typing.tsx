import {FC} from 'react'
import s from './Typing.module.css'

export const Typing: FC = () => (
	<div className={s.wrapper}>
		<div className={s.dot}/>
		<div className={s.dot}/>
		<div className={s.dot}/>
	</div>
)
