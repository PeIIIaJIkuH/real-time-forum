/* Core CSS required for Ionic components to work properly */
import {IonApp, IonContent, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from '@ionic/react'
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
import {chatbubbleEllipsesOutline, logInOutline, personOutline, readerOutline} from 'ionicons/icons'
import {observer} from 'mobx-react-lite'
import {FC} from 'react'
import {Redirect, Route, Switch} from 'react-router'
import {Header} from './components/Header'
import {Menu} from './components/Menu'
import {Auth} from './pages/Auth/Auth'
import {Chats} from './pages/Chats'
import {Posts} from './pages/Posts'
import {Profile} from './pages/Profile'
import authState from './store/authState'

/* Theme variables */
import './theme/variables.css'

export const App: FC = observer(() => (
	<>
		<Menu/>
		<IonApp>
			<Header/>
			<IonContent id='main'>
				<IonReactRouter>
					<IonTabs>
						<IonRouterOutlet>
							<Switch>
								<Route exact path='/posts'><Posts/></Route>
								<Route exact path='/chats'><Chats/></Route>
								<Route exact path='/profile'><Profile/></Route>
								<Route exact path='/auth'><Auth/></Route>
								<Redirect exact path='/' to='/posts'/>
							</Switch>
						</IonRouterOutlet>
						<IonTabBar slot='bottom'>
							<IonTabButton tab='posts' href='/posts'>
								<IonIcon icon={readerOutline}/>
								<IonLabel>Posts</IonLabel>
							</IonTabButton>
							<IonTabButton tab='chats' href='/chats'>
								<IonIcon icon={chatbubbleEllipsesOutline}/>
								<IonLabel>Chats</IonLabel>
							</IonTabButton>
							{authState.isAuth ? (
								<IonTabButton tab='profile' href='/profile'>
									<IonIcon icon={personOutline}/>
									<IonLabel>Profile</IonLabel>
								</IonTabButton>
							) : (
								<IonTabButton tab='auth' href='/auth'>
									<IonIcon icon={logInOutline}/>
									<IonLabel>Auth</IonLabel>
								</IonTabButton>
							)}
						</IonTabBar>
					</IonTabs>
				</IonReactRouter>
			</IonContent>
		</IonApp>
	</>
))
