import {IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react'
import {FC} from 'react'
import {Content} from '../../components/Content/Content'

export const NotFound: FC = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>404 Error - Not Found</IonTitle>
				</IonToolbar>
			</IonHeader>
			<Content>
				<div>
					Not found
				</div>
			</Content>
		</IonPage>
	)
}
