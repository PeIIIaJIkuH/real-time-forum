import {IonPage} from '@ionic/react'
import {observer} from 'mobx-react-lite'
import {FC} from 'react'
import {Redirect} from 'react-router'
import {Content} from '../components/Content/Content'
import {Header} from '../components/Header'
import authState from '../store/authState'

export const Profile: FC = observer(() => {
	if (!authState.user)
		return <Redirect to='/auth'/>

	return (
		<IonPage>
			<Header title='Profile'/>
			<Content>
				<div>Profile page</div>
			</Content>
		</IonPage>
	)
})
