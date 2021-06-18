import {IonGrid, IonItem, IonList, IonPage} from '@ionic/react'
import {FC} from 'react'
import {Content} from '../components/Content/Content'
import {Header} from '../components/Header'

export const Chats: FC = () => {
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
