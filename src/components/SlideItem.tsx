import {IonCol, IonGrid, IonRow} from '@ionic/react'
import {FC} from 'react'

export const SlideItem: FC = ({children}) => {
	return (
		<IonGrid fixed className='ion-no-padding ion-align-self-start'>
			<IonRow>
				<IonCol size='12' sizeSm='8' offsetSm='2' sizeMd='6' offsetMd='3' sizeLg='4' offsetLg='4' sizeXl='4' offsetXl='4'>
					{children}
				</IonCol>
			</IonRow>
		</IonGrid>
	)
}
