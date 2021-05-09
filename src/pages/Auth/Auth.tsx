import {IonPage, IonSlide, IonSlides} from '@ionic/react'
import {observer} from 'mobx-react-lite'
import {FC, RefObject, useEffect, useRef, useState} from 'react'
import {Redirect} from 'react-router'
import {SignInForm} from '../../components/AuthForm/SignInForm'
import {SignUpForm} from '../../components/AuthForm/SignUpForm'
import {Content} from '../../components/Content/Content'
import {Header} from '../../components/Header'
import {SlideItem} from '../../components/SlideItem'
import authState from '../../store/authState'
import s from './Auth.module.css'

export const Auth: FC = observer(() => {
	const [title, setTitle] = useState('Sign In')

	useEffect(() => {
		if (!slidesRef.current) return
		slidesRef.current.lockSwipes(true).then()
	}, [])

	const slidesRef = useRef<HTMLIonSlidesElement>(null),
		loginFormRef = useRef<HTMLFormElement>(null),
		registerFormRef = useRef<HTMLFormElement>(null)

	if (authState.user)
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
		setTitle('Sign Up')
		await slide(true, loginFormRef)
	}

	const slidePrev = async () => {
		setTitle('Sign In')
		await slide(false, registerFormRef)
	}

	return (
		<IonPage>
			<Header title={title}/>
			<Content>
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
			</Content>
		</IonPage>
	)
})
