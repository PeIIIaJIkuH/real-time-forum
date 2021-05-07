import {IonContent, IonPage} from '@ionic/react'
import {observer} from 'mobx-react-lite'
import {FC, useEffect} from 'react'
import {Redirect} from 'react-router'
import appState from '../store/appState'
import authState from '../store/authState'

export const Profile: FC = observer(() => {
	useEffect(() => {
		appState.setTitle('Profile')
	}, [])

	const {isAuth} = authState

	if (!isAuth) {
		return <Redirect to='/auth'/>
	}

	return (
		<IonPage>
			<IonContent>
				<div>Profile</div>
			</IonContent>
		</IonPage>
	)
})
