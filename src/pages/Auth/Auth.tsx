import {IonSlide, IonSlides} from '@ionic/react'
import {observer} from 'mobx-react-lite'
import {FC, useEffect, useRef} from 'react'
import {Redirect} from 'react-router'
import {SignInForm} from '../../components/AuthForm/SignInForm'
import {SignUpForm} from '../../components/AuthForm/SignUpForm'
import {SlideItem} from '../../components/SlideItem'
import authState from '../../store/authState'
import s from './Auth.module.css'

export const Auth: FC = observer(() => {
	const slidesRef = useRef<HTMLIonSlidesElement>(null)

	useEffect(() => {
		if (!slidesRef.current) return
		slidesRef.current.lockSwipes(true).then()
	}, [])

	if (authState.isAuth)
		return <Redirect to='/profile'/>

	const slideNext = async () => {
		if (!slidesRef.current) return
		await slidesRef.current.lockSwipes(false)
		await slidesRef.current.slideNext()
		await slidesRef.current.lockSwipes(true)
	}

	const slidePrev = async () => {
		if (!slidesRef.current) return
		await slidesRef.current.lockSwipes(false)
		await slidesRef.current.slidePrev()
		await slidesRef.current.lockSwipes(true)
	}

	return (
		<IonSlides className={s.slides} ref={slidesRef} pager>
			<IonSlide>
				<SlideItem title='Sign In'>
					<SignInForm slideNext={slideNext}/>
				</SlideItem>
			</IonSlide>
			<IonSlide>
				<SlideItem title='Sign Up'>
					<SignUpForm slidePrev={slidePrev}/>
				</SlideItem>
			</IonSlide>
		</IonSlides>
	)
})
