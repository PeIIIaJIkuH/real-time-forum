/* Core CSS required for Ionic components to work properly */
import {IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from '@ionic/react'
import {IonReactRouter} from '@ionic/react-router'
import '@ionic/react/css/core.css'
import '@ionic/react/css/display.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/float-elements.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/typography.css'
import {chatbubbleEllipsesOutline, personOutline, readerOutline} from 'ionicons/icons'
import {observer} from 'mobx-react-lite'
import {FC, useEffect} from 'react'
import {Redirect, Route, Switch} from 'react-router'
import {SideMenu} from './components/SideMenu'
import {ChatsPage} from './pages/ChatsPage/ChatsPage'
import {PostPage} from './pages/PostPage'
import {Posts} from './pages/Posts'
import {Profile} from './pages/Profile'
import authState from './store/authState'

/* Theme variables */
import './theme/variables.css'

export const App: FC = observer(() => {
	useEffect(() => {
		authState.fetchUserData().then()
	}, [])

	return <>
		<SideMenu/>
		<IonApp>
			<IonReactRouter>
				<IonTabs>
					<IonRouterOutlet id='main'>
						<Switch>
							<Route exact path='/posts/:id'><PostPage/></Route>
							<Route exact path='/posts'><Posts/></Route>
							<Route exact path='/chats'><ChatsPage/></Route>
							<Route exact path='/profile'><Profile/></Route>
							<Redirect exact path='/' to='/posts'/>
						</Switch>
					</IonRouterOutlet>
					<IonTabBar slot='bottom'>
						<IonTabButton tab='posts' href='/posts'>
							<IonIcon icon={readerOutline}/>
							<IonLabel>Posts</IonLabel>
						</IonTabButton>
						<IonTabButton tab='chats' href='/chats' disabled={!authState.user}>
							<IonIcon icon={chatbubbleEllipsesOutline}/>
							<IonLabel>Chats</IonLabel>
						</IonTabButton>
						<IonTabButton tab='profile' href='/profile' disabled={!authState.user}>
							<IonIcon icon={personOutline}/>
							<IonLabel>Profile</IonLabel>
						</IonTabButton>
					</IonTabBar>
				</IonTabs>
			</IonReactRouter>
		</IonApp>
	</>
})
