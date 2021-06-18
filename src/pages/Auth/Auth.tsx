import {IonButton, IonIcon, IonPage} from '@ionic/react'
import {arrowBackOutline} from 'ionicons/icons'
import {FC, useState} from 'react'
import {SignInForm} from '../../components/AuthForm/SignInForm'
import {SignUpForm} from '../../components/AuthForm/SignUpForm'
import {Content} from '../../components/Content/Content'
import {Header} from '../../components/Header'

interface Props {
	closeModal: () => void
}

export const Auth: FC<Props> = ({closeModal}) => {
	const [title, setTitle] = useState('Sign In'),
		[isLogIn, setIsLogIn] = useState(true)

	const toggle = () => {
		setTitle(isLogIn ? 'Sign Up' : 'Sign In')
		setIsLogIn(prev => !prev)
	}

	const backButton = (
		<IonButton onClick={closeModal}>
			<IonIcon icon={arrowBackOutline} slot='icon-only'/>
		</IonButton>
	)

	return (
		<IonPage>
			<Header title={title} backButton={backButton} showMenu={false}/>
			<Content>
				{isLogIn ? (
					<SignInForm toggle={toggle} closeModal={closeModal}/>
				) : (
					<SignUpForm toggle={toggle}/>
				)}
			</Content>
		</IonPage>
	)
}
