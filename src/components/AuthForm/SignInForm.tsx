import {IonButton, IonList, useIonToast} from '@ionic/react'
import {Form, Formik, FormikProps, FormikValues} from 'formik'
import {FC, RefObject} from 'react'
import {authAPI} from '../../api/auth'
import appState from '../../store/appState'
import authState from '../../store/authState'
import {LoginValues} from '../../types'
import {toastDuration} from '../../utils/constants'
import {loginValidationSchema} from '../../utils/validationSchemas'
import {InputItem} from '../InputItem/InputItem'

interface Props {
	slideNext: () => void
	innerRef: RefObject<HTMLFormElement>
}

export const SignInForm: FC<Props> = ({slideNext, innerRef}) => {
	const toast = useIonToast()[0]

	const initialValues: LoginValues = {
		usernameOrEmail: null,
		password: null
	}

	const onSubmit = async (values: FormikValues) => {
		appState.setIsLoading(true)
		const response = await authAPI.signIn(values as LoginValues)
		if (response.state) {
			await authState.fetchUserData()
		} else {
			toast({message: response.message, duration: toastDuration, color: 'danger'})
		}
		appState.setIsLoading(false)
	}

	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={loginValidationSchema}>
			{({values, handleSubmit, handleChange, errors, touched}: FormikProps<LoginValues>) => (
				<Form ref={innerRef} onSubmit={handleSubmit}>
					<IonList>
						<InputItem touched={touched.usernameOrEmail} error={errors.usernameOrEmail} value={values.usernameOrEmail} type='text'
								   name='usernameOrEmail' label='Username or Email' handleChange={handleChange} handleSubmit={handleSubmit}/>
						<InputItem touched={touched.password} error={errors.password} value={values.password} type='password'
								   name='password' label='Password' handleChange={handleChange} handleSubmit={handleSubmit}/>
						<IonButton type='submit' expand='full' className='ion-margin'>Log In</IonButton>
						<IonButton expand='full' className='ion-margin' fill='clear' onClick={slideNext}>Register</IonButton>
					</IonList>
				</Form>
			)}
		</Formik>
	)
}
