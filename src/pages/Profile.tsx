import {IonPage} from '@ionic/react'
import {observer} from 'mobx-react-lite'
import {FC} from 'react'
import {Content} from '../components/Content/Content'
import {Header} from '../components/Header'

export const Profile: FC = observer(() => {
	return (
		<IonPage>
			<Header title='Profile'/>
			<Content>
				<div>Profile page</div>
			</Content>
		</IonPage>
	)
})
