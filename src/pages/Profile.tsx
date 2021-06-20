import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonPage, IonRow} from '@ionic/react'
import {observer} from 'mobx-react-lite'
import {FC} from 'react'
import {useHistory} from 'react-router'
import {Content} from '../components/Content/Content'
import {Header} from '../components/Header'
import authState from '../store/authState'

export const Profile: FC = observer(() => {
	const history = useHistory()

	if (!authState.user && authState.connected) {
		setTimeout(() => history.push('/posts'))
	}

	const createdDate = new Date(authState.user?.createdAt! * 1000).toLocaleString(),
		lastActive = new Date(authState.user?.lastActive! * 1000).toLocaleString()

	return (
		<IonPage>
			<Header title='Profile'/>
			<Content>
				<IonGrid fixed>
					<IonRow>
						<IonCol>
							<IonCard>
								<IonCardHeader>
									<IonCardTitle>{authState.user?.username}</IonCardTitle>
									<IonCardSubtitle>
										<div>{authState.user?.status}</div>
										<div>{authState.user?.firstName} {authState.user?.lastName}</div>
									</IonCardSubtitle>
								</IonCardHeader>
								<IonCardContent>
									<div><strong>Email:</strong>: {authState.user?.email}</div>
									<div><strong>Created at</strong>: {createdDate}</div>
									<div><strong>Last active at</strong>: {lastActive}</div>
									<div><strong>Age</strong>: {authState.user?.age}</div>
									<div><strong>Gender</strong>: {authState.user?.gender}</div>
								</IonCardContent>
							</IonCard>
						</IonCol>
					</IonRow>
				</IonGrid>
			</Content>
		</IonPage>
	)
})
