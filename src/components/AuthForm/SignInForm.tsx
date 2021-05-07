import {IonButton, IonList} from '@ionic/react'
import {Form, Formik, FormikProps, FormikValues} from 'formik'
import {FC, RefObject} from 'react'
import authState from '../../store/authState'
import {LoginValues} from '../../types'
import {loginValidationSchema} from '../../utils/validationSchemas'
import {InputItem} from '../InputItem/InputItem'

interface Props {
	slideNext: () => void
	innerRef: RefObject<HTMLFormElement>
}

export const SignInForm: FC<Props> = ({slideNext, innerRef}) => {
	const initialValues: LoginValues = {
		usernameOrEmail: null,
		password: null
	}

	const onSubmit = (values: FormikValues) => {
		authState.setIsAuth(true)
	}

	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={loginValidationSchema}>
			{({values, handleSubmit, handleChange, errors, touched}: FormikProps<LoginValues>) => (
				<Form ref={innerRef} onSubmit={handleSubmit} onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}>
					<IonList>
						<InputItem touched={touched.usernameOrEmail} error={errors.usernameOrEmail} value={values.usernameOrEmail} type='text'
								   name='usernameOrEmail' label='Username or Email' handleChange={handleChange}/>
						<InputItem touched={touched.password} error={errors.password} value={values.password} type='password'
								   name='password' label='Password' handleChange={handleChange}/>
						<IonButton type='submit' expand='full' className='ion-margin'>Log In</IonButton>
						<IonButton expand='full' className='ion-margin' fill='clear' onClick={slideNext}>Register</IonButton>
					</IonList>
				</Form>
			)}
		</Formik>
	)
}
