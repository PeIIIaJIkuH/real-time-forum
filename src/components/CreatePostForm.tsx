import {IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, useIonToast} from '@ionic/react'
import {Form, Formik, FormikProps, FormikValues} from 'formik'
import {arrowBackOutline} from 'ionicons/icons'
import {FC} from 'react'
import {PostValues} from '../types'
import {postValidationSchema} from '../utils/validationSchemas'
import {InputItem} from './InputItem/InputItem'
import {TextareaItem} from './TextareaItem/TextareaItem'

interface Props {
	closeModal: () => void
}

export const CreatePostForm: FC<Props> = ({closeModal}) => {
	const toastError = useIonToast()[0]

	const initialValues: PostValues = {
		title: null,
		content: null
	}

	const onSubmit = async (values: FormikValues) => {
		console.log(values)
	}

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot='start'>
						<IonButton onClick={closeModal}>
							<IonIcon icon={arrowBackOutline} slot='icon-only'/>
						</IonButton>
					</IonButtons>
					<IonTitle>Create Post</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={postValidationSchema}>
					{({values, handleSubmit, handleChange, errors, touched}: FormikProps<PostValues>) => (
						<Form onSubmit={handleSubmit}>
							<InputItem touched={touched.title} error={errors.title} value={values.title} type='text'
									   name='title' label='Title' handleChange={handleChange} handleSubmit={handleSubmit}/>
							<TextareaItem touched={touched.content} error={errors.content} value={values.content} name='content' label='Content'
										  handleChange={handleChange} handleSubmit={handleSubmit}/>
							<IonButton type='submit' expand='full' className='ion-margin'>Create</IonButton>
						</Form>
					)}
				</Formik>
			</IonContent>
		</IonPage>
	)
}
