import {IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react'
import {FC} from 'react'

export const Posts: FC = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Posts</IonTitle>
				</IonToolbar>
			</IonHeader>
		</IonPage>
	)
}
