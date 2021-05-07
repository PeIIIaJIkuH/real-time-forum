import {IonSlide, IonSlides} from '@ionic/react'
import {observer} from 'mobx-react-lite'
import {FC, RefObject, useEffect, useRef} from 'react'
import {Redirect} from 'react-router'
import {SignInForm} from '../../components/AuthForm/SignInForm'
import {SignUpForm} from '../../components/AuthForm/SignUpForm'
import {SlideItem} from '../../components/SlideItem'
import authState from '../../store/authState'
import s from './Auth.module.css'

export const Auth: FC = observer(() => {
	const slidesRef = useRef<HTMLIonSlidesElement>(null),
		loginFormRef = useRef<HTMLFormElement>(null),
		registerFormRef = useRef<HTMLFormElement>(null)

	useEffect(() => {
		if (!slidesRef.current) return
		slidesRef.current.lockSwipes(true).then()
	}, [])

	if (authState.isAuth)
		return <Redirect to='/profile'/>

	const slide = async (toNext: boolean, ref: RefObject<HTMLFormElement>) => {
		if (!slidesRef.current) return
		await slidesRef.current.lockSwipes(false)
		if (toNext)
			await slidesRef.current.slideNext()
		else
			await slidesRef.current.slidePrev()
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
				<SlideItem title='Sign In'>
					<SignInForm slideNext={slideNext} innerRef={loginFormRef}/>
				</SlideItem>
			</IonSlide>
			<IonSlide>
				<SlideItem title='Sign Up'>
					<SignUpForm slidePrev={slidePrev} innerRef={registerFormRef}/>
				</SlideItem>
			</IonSlide>
		</IonSlides>
	)
})
