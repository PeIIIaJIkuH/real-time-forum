import {IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar} from '@ionic/react'
import {observer} from 'mobx-react-lite'
import {FC} from 'react'

interface Props {
	title: string
	backButton?: JSX.Element
	showMenu?: boolean
}

export const Header: FC<Props> = observer(({title, backButton, showMenu = true}) => {
		return (
			<IonHeader translucent>
				<IonToolbar>
					<IonButtons slot='start'>
						{backButton}
					</IonButtons>
					<IonTitle>{title}</IonTitle>
					{showMenu && (
						<IonButtons slot='end'>
							<IonMenuButton/>
						</IonButtons>
					)}
				</IonToolbar>
			</IonHeader>
		)
	}
)
