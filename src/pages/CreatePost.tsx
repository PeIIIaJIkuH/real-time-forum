import {
	IonButton,
	IonButtons,
	IonChip,
	IonCol,
	IonContent,
	IonHeader,
	IonIcon,
	IonItem,
	IonLabel,
	IonModal,
	IonPage,
	IonTitle,
	IonToolbar,
	useIonToast,
} from '@ionic/react'
import {Form, Formik, FormikProps, FormikValues} from 'formik'
import {arrowBackOutline} from 'ionicons/icons'
import {FC, useEffect, useState} from 'react'
import {postsAPI} from '../api/posts'
import {InputItem} from '../components/InputItem/InputItem'
import {TextareaItem} from '../components/TextareaItem/TextareaItem'
import postsState from '../store/postsState'
import {ICategory, PostValues} from '../types'
import {toastDuration} from '../utils/constants'
import {postValidationSchema} from '../utils/validationSchemas'
import {SelectCategories} from './SelectCategories'

interface Props {
	closeModal: () => void
}

export const CreatePost: FC<Props> = ({closeModal}) => {
	const toast = useIonToast()[0],
		[isOpen, setIsOpen] = useState(false),
		[categories, setCategories] = useState<ICategory[]>([]),
		[selected, setSelected] = useState<Record<string, boolean>>({}),
		[names, setNames] = useState<Set<string>>(new Set())

	const initialValues: PostValues = {
		title: null,
		content: null,
		categories: null,
	}

	const onSubmit = async (values: FormikValues) => {
		const selectedCategories = Object.keys(selected).filter(name => selected[name])
		if (selectedCategories.length === 0) {
			toast({message: 'Add at least one category!', duration: toastDuration, color: 'danger'})
			return
		}
		const valuesWithCategories = {
			...values,
			categories: selectedCategories,
		}
		const response = await postsAPI.createPost(valuesWithCategories as PostValues)
		if (response.state) {
			await postsState.fetchCreatedPosts(1)
			closeModal()
			toast({message: response.message, duration: toastDuration, color: 'success'})
		} else {
			toast({message: response.message, duration: toastDuration, color: 'danger'})
		}
	}

	const onClick = () => {
		setIsOpen(true)
	}

	const closeCategoriesModal = (success: boolean) => {
		if (success) {
			toast({message: 'Changes are saved', duration: toastDuration, color: 'success'})
		} else {
			toast({message: 'Changes are not saved', duration: toastDuration, color: 'warning'})
		}
		setIsOpen(false)
	}

	useEffect(() => {
		const f = async () => {
			const response = await postsAPI.getCategories()
			setCategories(response.data)
			const names = new Set<string>()
			for (let i = 0; i < response.data.length; i++) {
				names.add(response.data[i].name)
			}
			setNames(names)
		}
		f().then()
	}, [])

	const filteredSelected = Object.keys(selected).filter(name => selected[name])

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
							<TextareaItem touched={touched.content} error={errors.content} value={values.content}
							              name='content' label='Content' handleChange={handleChange} handleSubmit={handleSubmit}
							/>
							<IonItem button={true} onClick={onClick} lines='full'>
								<IonLabel>Categories</IonLabel>
								<IonCol className='ion-justify-content-end'>
									{filteredSelected.map(name => (
										<IonChip outline={true} color='medium' key={name}>
											<IonLabel>{name}</IonLabel>
										</IonChip>
									))}
								</IonCol>
							</IonItem>
							<IonButton type='submit' expand='full' className='ion-margin'>Create</IonButton>
						</Form>
					)}
				</Formik>
				<IonModal isOpen={isOpen}>
					<SelectCategories closeModal={closeCategoriesModal} categories={categories} selected={selected}
					                  setSelected={setSelected} names={names}
					/>
				</IonModal>
			</IonContent>
		</IonPage>
	)
}
