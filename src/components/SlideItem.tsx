import {IonContent, IonGrid, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react'
import {FC} from 'react'

interface Props {
	title: string
}

export const SlideItem: FC<Props> = ({title, children}) => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar className='ion-text-center'>
					<IonTitle>{title}</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonGrid fixed>
					{children}
				</IonGrid>
			</IonContent>
		</IonPage>
	)
}
