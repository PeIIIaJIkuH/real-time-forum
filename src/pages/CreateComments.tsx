import {
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonPage,
	IonTitle,
	IonToolbar,
	useIonToast,
} from '@ionic/react'
import {Form, Formik, FormikProps, FormikValues} from 'formik'
import {arrowBackOutline} from 'ionicons/icons'
import {FC} from 'react'
import {postsAPI} from '../api/posts'
import {TextareaItem} from '../components/TextareaItem/TextareaItem'
import appState from '../store/appState'
import postStore from '../store/postState'
import {CommentValues} from '../types'
import {toastDuration} from '../utils/constants'
import {commentValidationSchema} from '../utils/validationSchemas'

interface Props {
	closeModal: () => void
	postId: string
}

export const CreateComment: FC<Props> = ({closeModal, postId}) => {
	const toast = useIonToast()[0]

	const initialValues: CommentValues = {
		comment: null,
	}

	const onSubmit = async ({comment}: FormikValues) => {
		const response = await postsAPI.createComment(comment, postId)
		if (response.state) {
			appState.setIsLoading(true)
			await postStore.fetchComments(String(postId))
			appState.setIsLoading(false)
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
					<IonTitle>Create Comment</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={commentValidationSchema}>
					{({values, handleSubmit, handleChange, errors, touched}: FormikProps<CommentValues>) => (
						<Form onSubmit={handleSubmit}>
							<TextareaItem touched={touched.comment} error={errors.comment} value={values.comment} name='comment' label='Comment'
							              handleChange={handleChange} handleSubmit={handleSubmit}
							/>
							<IonButton type='submit' expand='full' className='ion-margin'>Create</IonButton>
						</Form>
					)}
				</Formik>
			</IonContent>
		</IonPage>
	)
}
