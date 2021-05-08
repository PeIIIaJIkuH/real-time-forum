import {IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar} from '@ionic/react'
import {observer} from 'mobx-react-lite'
import {FC} from 'react'
import appState from '../store/appState'

export const Header: FC = observer(() => {
	return (
		<IonHeader translucent>
			<IonToolbar>
				<IonButtons slot='end'>
					<IonMenuButton/>
				</IonButtons>
				<IonTitle>{appState.title}</IonTitle>
			</IonToolbar>
		</IonHeader>
	)
})
