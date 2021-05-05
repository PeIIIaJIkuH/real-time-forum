import {IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react'
import {FC} from 'react'

export const Profile: FC = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Profile</IonTitle>
				</IonToolbar>
			</IonHeader>
		</IonPage>
	)
}
