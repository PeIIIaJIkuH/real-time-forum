import {IonButton, IonContent, IonFooter, IonHeader, IonItem, IonLabel, IonMenu, IonTitle, IonToolbar} from '@ionic/react'
import {observer} from 'mobx-react-lite'
import {FC, useRef} from 'react'
import appState from '../store/appState'
import authState from '../store/authState'

export const Menu: FC = observer(() => {
	const menuRef = useRef<HTMLIonMenuElement>(null)

	const onClick = async () => {
		appState.setIsLoading(true)
		await authState.signOut()
		appState.setIsLoading(false)
		await menuRef.current!.close()
	}

	return (
		<IonMenu contentId='main' ref={menuRef}>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Real time forum</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				{authState.user && <>
					<IonItem>
						<IonLabel>{authState.user.username}</IonLabel>
					</IonItem>
					<IonItem>
						<IonButton expand='block' fill='clear' color='danger' onClick={onClick}>Log out</IonButton>
					</IonItem>
				</>}
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonTitle>PeIIIaJIkuH, indecember</IonTitle>
				</IonToolbar>
			</IonFooter>
		</IonMenu>
	)
})
