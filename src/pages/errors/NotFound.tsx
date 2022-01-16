import {IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react'
import {FC} from 'react'
import {Content} from '../../components/Content/Content'
import s from './errors.module.css'

export const NotFound: FC = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>404 Error - Not Found</IonTitle>
				</IonToolbar>
			</IonHeader>
			<Content>
				<div className={s.wrapper}>
					We can't seem to find the page you're looking for
				</div>
			</Content>
		</IonPage>
	)
}
