import {IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar} from '@ionic/react'
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
				<IonGrid fixed className='ion-no-padding'>
					<IonRow>
						<IonCol size='12' sizeSm='8' offsetSm='2' sizeMd='6' offsetMd='3' sizeLg='4' offsetLg='4' sizeXl='4' offsetXl='4'>
							{children}
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	)
}
