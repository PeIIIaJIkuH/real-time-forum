import {IonGrid, IonItem, IonList, IonPage} from '@ionic/react'
import {FC} from 'react'
import {Redirect} from 'react-router'
import {Content} from '../components/Content/Content'
import {Header} from '../components/Header'
import authState from '../store/authState'

export const Chats: FC = () => {
	if (!authState.user)
		return <Redirect to='/auth'/>

	return (
		<IonPage>
			<Header title='Chats'/>
			<Content>
				<IonGrid fixed className='ion-no-padding'>
					<IonList>
						{Array(25).fill(1).map((n, i) => (
							<IonItem key={i}>Chat {i}</IonItem>
						))}
					</IonList>
				</IonGrid>
			</Content>
		</IonPage>
	)
}
