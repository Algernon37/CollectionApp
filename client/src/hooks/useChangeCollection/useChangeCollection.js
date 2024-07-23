import { useEffect, useState } from 'react';
import { updateDoc, storage, ref, uploadBytes, getDownloadURL } from '../../firebaseConfig'

const useChangeCollection = (collectionId, collectionRef, fetchCollectionAndItemsData) => {
    const [newName, setNewName] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newTheme, setNewTheme] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [otherTheme, setOtherTheme] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const handleCancelEdit = () => {
        setNewName('');
        setNewDescription('');
        setNewTheme('');
        setOtherTheme('');
        setImage(null);
        toggleForm();
    };

    useEffect(() => {
        if (image) {
            uploadImage(image);
        }
    }, [image]);

    const uploadImage = async (file) => {
        if (!file) {
            console.error('No file provided');
            return '';
        }
        try {
            const imageRef = ref(storage, `images/${file.name}`);
            await uploadBytes(imageRef, file);
            const url = await getDownloadURL(imageRef);
            setImageUrl(url);
            return url;
        } catch (error) {
            console.error('Error uploading image:', error);
            return '';
        }
    };

    const handleEditCollection = async () => {
        let imageUrl = '';
        if (image) {
            imageUrl = await uploadImage(image);
        }

        const newData = {
            name: otherTheme ? otherTheme : newTheme,
            description: newDescription,
            theme: newTheme,
            imageUrl
        };

        try {
            await editCollection(collectionId, newData);
            fetchCollectionAndItemsData();
        } catch (error) {
            console.error('Error updating collection:', error);
        }

        toggleForm();
    };


    const editCollection = async (collectionId, newData) => {
        try {
            await updateDoc(collectionRef, newData);
            console.log(`Collection updated successfully: ${collectionId}`);
        } catch (error) {
            console.error('Error updating collection:', error);
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
        otherTheme,
        setOtherTheme,
        image,
        setImage,
        imageUrl,
        setImageUrl,
        handleCancelEdit
    };
};

export default useChangeCollection;

