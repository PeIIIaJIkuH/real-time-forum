import {IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar} from '@ionic/react'
import {observer} from 'mobx-react-lite'
import {FC, ReactNode} from 'react'
import chatsState from '../store/chatsState'

interface Props {
	title: string
	backButton?: JSX.Element
	showMenu?: boolean
	subTitle?: ReactNode
	isChat?: boolean
}

export const Header: FC<Props> = observer(({
	                                           title, backButton, showMenu = true,
	                                           subTitle, isChat = false,
                                           }) => {
		return (
			<IonHeader translucent>
				<IonToolbar>
					<IonButtons slot='start'>
						{backButton}
					</IonButtons>
					<IonTitle>{title}</IonTitle>
					{isChat && (
						<IonTitle size='small'>
							{subTitle ? subTitle : (chatsState.room?.user.status || 'offline')}
						</IonTitle>
					)}
					{showMenu && (
						<IonButtons slot='end'>
							<IonMenuButton/>
						</IonButtons>
					)}
				</IonToolbar>
			</IonHeader>
		)
	},
)
