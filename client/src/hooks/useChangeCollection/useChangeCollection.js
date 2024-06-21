import { useState } from 'react';
import {updateDoc} from '../../firebaseConfig'

const useChangeCollection = (collectionId, collectionRef) => {
    const [newName, setNewName] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newTheme, setNewTheme] = useState('');
    const [showForm, setShowForm] = useState(false);
    
    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const handleEditCollection = () => {
        editCollection(collectionId, {
            name: newName,
            description: newDescription,
            theme: newTheme,
        });
        toggleForm();
    };

    const editCollection = async (collectionId, newData) => {
        try {
            await updateDoc(collectionRef, newData);
            console.log(`Коллекция успешно изменена: ${collectionId}`);
        } catch (error) {
            console.error('Ошибка при изменении коллекции:', error);
        }
    };

    return {
        newName,
        setNewName,
        newDescription,
        setNewDescription,
        newTheme,
        setNewTheme,
        showForm,
        setShowForm,
        handleEditCollection,
    };
};

export default useChangeCollection;

