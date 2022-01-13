import {IonContent, IonProgressBar} from '@ionic/react'
import clsx from 'clsx'
import {observer} from 'mobx-react-lite'
import {FC} from 'react'
import appState from '../../store/appState'
import s from './Content.module.css'

export const Content: FC = observer(({children}) => {
	return (
		<IonContent fullscreen={true}>
			<IonProgressBar type='indeterminate' className={clsx(s.progressBar, appState.isLoading && s.show)}/>
			{children}
		</IonContent>
	)
})
