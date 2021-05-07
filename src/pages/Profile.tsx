import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react'
import {observer} from 'mobx-react-lite'
import {FC} from 'react'
import {Redirect} from 'react-router'
import authState from '../store/authState'

export const Profile: FC = observer(() => {
	const {isAuth} = authState

	if (!isAuth) {
		return <Redirect to='/auth'/>
	}

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar className='ion-text-center'>
					<IonTitle>Profile</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<div>Profile</div>
			</IonContent>
		</IonPage>
	)
})
