import {IonButton, IonContent, IonFooter, IonHeader, IonMenu, IonTitle, IonToolbar} from '@ionic/react'
import {observer} from 'mobx-react-lite'
import {FC, useRef} from 'react'
import authState from '../store/authState'

export const Menu: FC = observer(() => {
	const menuRef = useRef<HTMLIonMenuElement>(null)

	return (
		<IonMenu contentId='main' ref={menuRef}>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Real time forum</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				{authState.user && (
					<IonButton onClick={async () => {
						await authState.signOut()
						await menuRef.current!.close()
					}
					}>Log out</IonButton>
				)}
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonTitle>PeIIIaJIkuH, indecember</IonTitle>
				</IonToolbar>
			</IonFooter>
		</IonMenu>
	)
})
