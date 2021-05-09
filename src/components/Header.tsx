import {IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar} from '@ionic/react'
import {observer} from 'mobx-react-lite'
import {FC} from 'react'

interface Props {
	title: string
}

export const Header: FC<Props> = observer(({title}) => {
	return (
		<IonHeader translucent>
			<IonToolbar>
				<IonTitle>{title}</IonTitle>
				<IonButtons slot='end'>
					<IonMenuButton/>
				</IonButtons>
			</IonToolbar>
		</IonHeader>
	)
})
