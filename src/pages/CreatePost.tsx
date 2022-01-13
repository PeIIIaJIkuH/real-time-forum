import {
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonItem,
	IonLabel,
	IonPage,
	IonSelect,
	IonSelectOption,
	IonTitle,
	IonToolbar,
	useIonToast,
} from '@ionic/react'
import clsx from 'clsx'
import {Form, Formik, FormikProps, FormikValues} from 'formik'
import {arrowBackOutline} from 'ionicons/icons'
import {FC} from 'react'
import {postsAPI} from '../api/posts'
import {ErrorItem} from '../components/ErrorItem/ErrorItem'
import {InputItem} from '../components/InputItem/InputItem'
import {TextareaItem} from '../components/TextareaItem/TextareaItem'
import postsStore from '../store/postsState'
import {PostValues} from '../types'
import {toastDuration} from '../utils/constants'
import {postValidationSchema} from '../utils/validationSchemas'

interface Props {
	closeModal: () => void
}

export const CreatePost: FC<Props> = ({closeModal}) => {
	const toast = useIonToast()[0]

	const initialValues: PostValues = {
		title: null,
		content: null,
		categories: null,
	}

	const onSubmit = async (values: FormikValues) => {
		const response = await postsAPI.createPost(values as PostValues)
		if (response.state) {
			await postsStore.fetchCreatedPosts(1)
			closeModal()
			toast({message: response.message, duration: toastDuration, color: 'success'})
		} else {
			toast({message: response.message, duration: toastDuration, color: 'danger'})
		}
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
							           name='title' label='Title' handleChange={handleChange} handleSubmit={handleSubmit}
							/>
							<TextareaItem touched={touched.content} error={errors.content} value={values.content} name='content' label='Content'
							              handleChange={handleChange} handleSubmit={handleSubmit}
							/>
							<IonItem className={clsx(touched.categories)}>
								<IonLabel position='floating'>Categories</IonLabel>
								<IonSelect name='categories' value={values.categories} interface='alert' onIonChange={handleChange}>
									<IonSelectOption value='text'>text</IonSelectOption>
									<IonSelectOption value='story'>story</IonSelectOption>
									<IonSelectOption value='meme'>meme</IonSelectOption>
									<IonSelectOption value='sport'>sport</IonSelectOption>
									<IonSelectOption value='music'>music</IonSelectOption>
									<IonSelectOption value='games'>games</IonSelectOption>
								</IonSelect>
							</IonItem>
							{touched.categories && errors.categories && (
								<ErrorItem message={errors.categories}/>
							)}
							<IonButton type='submit' expand='full' className='ion-margin'>Create</IonButton>
						</Form>
					)}
				</Formik>
			</IonContent>
		</IonPage>
	)
}
