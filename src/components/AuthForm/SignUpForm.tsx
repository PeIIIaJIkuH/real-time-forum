import {IonButton, IonItem, IonLabel, IonList, IonSelect, IonSelectOption, useIonToast} from '@ionic/react'
import clsx from 'clsx'
import {Form, Formik, FormikProps, FormikValues} from 'formik'
import {FC} from 'react'
import {authAPI} from '../../api/auth'
import appState from '../../store/appState'
import {RegisterValues} from '../../types'
import {toastDuration} from '../../utils/constants'
import {registerValidationSchema} from '../../utils/validationSchemas'
import {ErrorItem} from '../ErrorItem/ErrorItem'
import {InputItem} from '../InputItem/InputItem'
import s from './AuthForm.module.css'

interface Props {
	toggle: () => void
}

export const SignUpForm: FC<Props> = ({toggle}) => {
	const toast = useIonToast()[0]

	const initialValues: RegisterValues = {
		username: null,
		email: null,
		password: null,
		rePassword: null,
		firstName: null,
		lastName: null,
		age: null,
		gender: null
	}

	const onSubmit = async (values: FormikValues) => {
		appState.setIsLoading(true)
		const response = await authAPI.signUp(values as RegisterValues)
		if (response.state) {
			toast({message: response.message, duration: toastDuration, color: 'success'})
			toggle()
		} else {
			toast({message: response.message, duration: toastDuration, color: 'danger'})
		}
		appState.setIsLoading(false)
	}

	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={registerValidationSchema}>
			{({values, handleSubmit, handleChange, errors, touched}: FormikProps<RegisterValues>) => (
				<Form onSubmit={handleSubmit} onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}>
					<IonList>
						<InputItem touched={touched.username} error={errors.username} value={values.username} type='text' name='username'
						           label='Username' handleChange={handleChange} handleSubmit={handleSubmit}
						/>
						<InputItem touched={touched.email} error={errors.email} value={values.email} type='email' name='email'
						           label='Email' handleChange={handleChange} handleSubmit={handleSubmit} mode='email'
						/>
						<InputItem touched={touched.password} error={errors.password} value={values.password} type='password' name='password'
						           label='Password' handleChange={handleChange} handleSubmit={handleSubmit}
						/>
						<InputItem touched={touched.rePassword} error={errors.rePassword} value={values.rePassword} type='password' name='rePassword'
						           label='Confirm password' handleChange={handleChange} handleSubmit={handleSubmit}
						/>
						<InputItem touched={touched.firstName} error={errors.firstName} value={values.firstName} type='text' name='firstName'
						           label='First name' handleChange={handleChange} handleSubmit={handleSubmit}
						/>
						<InputItem touched={touched.lastName} error={errors.lastName} value={values.lastName} type='text' name='lastName'
						           label='Last name' handleChange={handleChange} handleSubmit={handleSubmit}
						/>
						<InputItem touched={touched.age} error={errors.age} value={values.age} type='number' name='age'
						           label='Age' handleChange={handleChange} handleSubmit={handleSubmit} mode='numeric'
						/>
						<IonItem className={clsx(touched.gender && errors.gender ? s.incorrect : s.correct)}>
							<IonLabel position='floating'>Gender</IonLabel>
							<IonSelect name='gender' value={values.gender} interface='action-sheet' onIonChange={handleChange}>
								<IonSelectOption value='male'>Male</IonSelectOption>
								<IonSelectOption value='female'>Female</IonSelectOption>
								<IonSelectOption value='other'>Other</IonSelectOption>
							</IonSelect>
						</IonItem>
						{touched.gender && errors.gender && (
							<ErrorItem message={errors.gender}/>
						)}
						<IonButton type='submit' expand='full' className='ion-margin'>Register</IonButton>
						<IonButton expand='full' className='ion-margin' fill='clear' onClick={toggle}>Log In</IonButton>
					</IonList>
				</Form>
			)}
		</Formik>
	)
}
