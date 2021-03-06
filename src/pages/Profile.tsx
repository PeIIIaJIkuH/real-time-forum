import {
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonCol,
	IonGrid,
	IonPage,
	IonRow,
} from '@ionic/react'
import {observer} from 'mobx-react-lite'
import {FC, useEffect} from 'react'
import {useHistory} from 'react-router'
import {Content} from '../components/Content/Content'
import {Header} from '../components/Header'
import authState from '../store/authState'
import {getTime} from '../utils/helpers'
import {DateTime} from 'luxon'

export const Profile: FC = observer(() => {
	const history = useHistory()

	useEffect(() => {
		authState.fetchUserData().then()
	}, [])

	if (!authState.user && authState.connected) {
		setTimeout(() => history.push('/posts'))
	}

	return (
		<IonPage>
			<Header title='Profile'/>
			<Content>
				<IonGrid fixed>
					<IonRow>
						<IonCol>
							<IonCard>
								{authState.user && <>
									<IonCardHeader>
										<IonCardTitle>{authState.user?.username}</IonCardTitle>
										<IonCardSubtitle>
											<div>{authState.user?.status}</div>
											<div>{authState.user?.firstName} {authState.user?.lastName}</div>
										</IonCardSubtitle>
									</IonCardHeader>
									<IonCardContent>
										<div><strong>Email:</strong>: {authState.user?.email}</div>
										<div><strong>Created
											at</strong>: {DateTime.fromMillis(authState.user?.createdAt * 1000).toFormat('dd.MM.yyyy HH:mm')}
										</div>
										<div><strong>Last active
											at</strong>: {getTime(authState.user?.lastActive, true)}</div>
										<div><strong>Age</strong>: {authState.user?.age}</div>
										<div><strong>Gender</strong>: {authState.user?.gender}</div>
									</IonCardContent>
								</>}
							</IonCard>
						</IonCol>
					</IonRow>
				</IonGrid>
			</Content>
		</IonPage>
	)
})
