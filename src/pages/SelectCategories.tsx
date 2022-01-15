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
	IonTitle,
	IonToolbar,
} from '@ionic/react'
import {addOutline, arrowBackOutline, checkmarkOutline, searchOutline} from 'ionicons/icons'
import {ICategory} from '../types'

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

	const filteredCategories = categories.filter(category => {
		const trimmed = text.trim()
		return !trimmed || category.name.includes(trimmed)
	})

	const filteredNewSelected = Object.keys(newSelected).filter(name => !names.has(name))

	return (
		<>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot='start'>
						<IonButton onClick={onCloseClick}>
							<IonIcon icon={arrowBackOutline} slot='icon-only'/>
						</IonButton>
					</IonButtons>
					<IonTitle>Select Categories</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonItem>
					<IonInput placeholder='Search' value={text} onIonChange={onChange} maxlength={20} onKeyDown={onKeyDown}/>
					<IonIcon icon={searchOutline} slot='start'/>
					{text.trim() && !categories.some(category => category.name === text.trim()) && !newSelected[text.trim()] && (
						<IonButton slot='end' fill='clear' color='medium' onClick={addCategory}>
							<IonIcon slot='icon-only' icon={addOutline}/>
						</IonButton>
					)}
				</IonItem>
				<IonList>
					{filteredNewSelected.map(name => (
						<IonItem key={name} onClick={() => onClick(name)} button={true}>
							<IonText>{name}</IonText>
							{newSelected[name] && (
								<IonIcon icon={checkmarkOutline} slot='end' size='small'/>
							)}
						</IonItem>
					))}
					{filteredCategories.map(category => (
						<IonItem key={category.id} onClick={() => onClick(category.name)} button={true}>
							<IonText>{category.name}</IonText>
							{newSelected[category.name] && (
								<IonIcon icon={checkmarkOutline} slot='end' size='small'/>
							)}
						</IonItem>
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
