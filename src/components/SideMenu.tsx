import {
	IonButton,
	IonButtons,
	IonCol,
	IonContent,
	IonFooter,
	IonHeader,
	IonIcon,
	IonMenu,
	IonModal,
	IonRow,
	IonTitle,
	IonToolbar,
} from '@ionic/react'
import {closeOutline} from 'ionicons/icons'
import {observer} from 'mobx-react-lite'
import {FC, useRef, useState} from 'react'
import {Auth} from '../pages/Auth/Auth'
import appState from '../store/appState'
import authState from '../store/authState'

export const SideMenu: FC = observer(() => {
	const menuRef = useRef<HTMLIonMenuElement>(null),
		[isOpen, setIsOpen] = useState(false)

	const logOut = async () => {
		appState.setIsLoading(true)
		await authState.signOut()
		appState.setIsLoading(false)
		await menuRef.current!.close()
	}

	const closeMenu = async () => {
		await menuRef.current!.close()
	}

	const openModal = async () => {
		await closeMenu()
		setIsOpen(true)
	}

	const closeModal = () => {
		setIsOpen(false)
	}

	return (
		<IonMenu contentId='main' ref={menuRef} side='end'>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Real time forum</IonTitle>
					<IonButtons slot='end'>
						<IonButton onClick={closeMenu}>
							<IonIcon icon={closeOutline} slot='icon-only'/>
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				{authState.user ? (
					<IonRow>
						<IonCol>
							<IonButton expand='block' color='danger' onClick={logOut}>Log out</IonButton>
						</IonCol>
					</IonRow>
				) : (
					<IonRow>
						<IonCol>
							<IonButton expand='block' onClick={openModal}>Log In</IonButton>
						</IonCol>
					</IonRow>
				)}
				<IonModal isOpen={isOpen}>
					<Auth closeModal={closeModal}/>
				</IonModal>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonTitle>PeIIIaJIkuH, indecember</IonTitle>
				</IonToolbar>
			</IonFooter>
		</IonMenu>
	)
})
