import {Dispatch, FC, KeyboardEventHandler, SetStateAction, useState} from 'react'
import {
	IonButton,
	IonButtons,
	IonContent,
	IonFooter,
	IonHeader,
	IonIcon,
	IonInput,
	IonItem,
	IonList,
	IonText,
	IonToolbar,
} from '@ionic/react'
import {addOutline, arrowBackOutline, checkmarkOutline} from 'ionicons/icons'
import {ICategory} from '../types'

interface CategoryItemProps {
	name: string
	isSelected: boolean
	callback: (name: string) => void
}

const CategoryItem: FC<CategoryItemProps> = ({name, isSelected, callback}) => {
	const onClick = () => {
		callback(name)
	}

	return (
		<IonItem key={name} onClick={onClick} button>
			<IonText>{name}</IonText>
			{isSelected && (
				<IonIcon icon={checkmarkOutline} slot='end' size='small'/>
			)}
		</IonItem>
	)
}

interface Props {
	closeModal: (success: boolean) => void
	categories: ICategory[]
	selected: Record<string, boolean>
	setSelected: Dispatch<SetStateAction<Record<string, boolean>>>
	names: Set<string>
}

export const SelectCategories: FC<Props> = ({closeModal, categories, selected, setSelected, names}) => {
	const [text, setText] = useState(''),
		[newSelected, setNewSelected] = useState<Record<string, boolean>>({...selected})

	const onClick = (name: string) => {
		if (newSelected[name]) {
			setNewSelected(prev => {
				prev[name] = false
				return {...prev}
			})
		} else {
			setNewSelected(prev => {
				prev[name] = true
				return {...prev}
			})
		}
	}

	const onChange = (e: any) => {
		setText(e.target.value)
	}

	const addCategory = () => {
		const trimmed = text.trim()
		if (trimmed && !newSelected[trimmed]) {
			setNewSelected(prev => {
				prev[trimmed] = true
				return {...prev}
			})
		}
		setText('')
	}

	const onKeyDown: KeyboardEventHandler = (e) => {
		if (e.key === 'Enter') {
			addCategory()
		}
	}

	const deleteUnusedCategories = () => {
		setSelected(prev => {
			Object.keys(prev).forEach(name => {
				if (!prev[name]) {
					delete prev[name]
				}
			})
			return prev
		})
	}

	const onCloseClick = () => {
		deleteUnusedCategories()
		setNewSelected(selected)
		closeModal(false)
	}

	const onSaveClick = () => {
		setSelected(newSelected)
		deleteUnusedCategories()
		closeModal(true)
	}

	const trimmed = text.trim()
	const filteredCategories = categories.filter(({name}) => !trimmed || name.includes(trimmed))
	const filteredNewSelected = Object.keys(newSelected)
		.filter(name => (!names.has(name) && name.includes(trimmed)))

	return (
		<>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot='start'>
						<IonButton onClick={onCloseClick}>
							<IonIcon icon={arrowBackOutline} slot='icon-only'/>
						</IonButton>
					</IonButtons>
					<IonInput placeholder='Search or create categories' value={text} onIonChange={onChange} maxlength={20} onKeyDown={onKeyDown}/>
					{trimmed && !categories.some(category => category.name === trimmed) && !newSelected[trimmed] && (
						<IonButton slot='end' fill='clear' color='primary' onClick={addCategory}>
							<IonIcon slot='icon-only' icon={addOutline}/>
						</IonButton>
					)}
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList>
					{filteredNewSelected.map(name => (
						<CategoryItem name={name} isSelected={newSelected[name]} callback={onClick} key={name}/>
					))}
					{filteredCategories.map(({id, name}) => (
						<CategoryItem key={id} name={name} isSelected={newSelected[name]} callback={onClick}/>
					))}
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton expand='block' className='ion-margin-horizontal' onClick={onSaveClick}>
						Save
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</>
	)
}
