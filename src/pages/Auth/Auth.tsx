import {IonSlide, IonSlides} from '@ionic/react'
import {observer} from 'mobx-react-lite'
import {FC, RefObject, useEffect, useRef, useState} from 'react'
import {Redirect} from 'react-router'
import {SignInForm} from '../../components/AuthForm/SignInForm'
import {SignUpForm} from '../../components/AuthForm/SignUpForm'
import {SlideItem} from '../../components/SlideItem'
import appState from '../../store/appState'
import authState from '../../store/authState'
import s from './Auth.module.css'

export const Auth: FC = observer(() => {
	useEffect(() => {
		if (!slidesRef.current) return
		slidesRef.current.lockSwipes(true).then()
	}, [])

	const slidesRef = useRef<HTMLIonSlidesElement>(null),
		loginFormRef = useRef<HTMLFormElement>(null),
		registerFormRef = useRef<HTMLFormElement>(null),
		[slideIndex, setSlideIndex] = useState(0)

	useEffect(() => {
		if (slideIndex === 0)
			appState.setTitle('Sign In')
		else
			appState.setTitle('Sign Up')
	}, [slideIndex])

	if (authState.user)
		return <Redirect to='/profile'/>

	const slide = async (toNext: boolean, ref: RefObject<HTMLFormElement>) => {
		if (!slidesRef.current) return
		await slidesRef.current.lockSwipes(false)
		if (toNext)
			await slidesRef.current.slideNext()
		else
			await slidesRef.current.slidePrev()
		setSlideIndex(toNext ? 1 : 0)
		setTimeout(() => {
			ref.current!.reset()
		}, 400)
		await slidesRef.current.lockSwipes(true)
	}

	const slideNext = async () => {
		await slide(true, loginFormRef)
	}

	const slidePrev = async () => {
		await slide(false, registerFormRef)
	}

	return (
		<IonSlides className={s.slides} ref={slidesRef} pager>
			<IonSlide>
				<SlideItem>
					<SignInForm slideNext={slideNext} innerRef={loginFormRef}/>
				</SlideItem>
			</IonSlide>
			<IonSlide>
				<SlideItem>
					<SignUpForm slidePrev={slidePrev} innerRef={registerFormRef}/>
				</SlideItem>
			</IonSlide>
		</IonSlides>
	)
})
