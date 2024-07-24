import { db, auth, collection, addDoc, getDocs, deleteDoc, doc, query, where, writeBatch, ref, uploadBytes, getDownloadURL, storage, deleteObject, getDoc } from "../../firebaseConfig";
import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const useCollectionManagement = () => {
    const [collections, setCollections] = useState([]);
    const [newCollectionName, setNewCollectionName] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newTheme, setNewTheme] = useState('');
    const [otherTheme, setOtherTheme] = useState('');
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const navigate = useNavigate();
    const collectionsRef = collection(db, 'collections');

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user);
        });
    }, []);

    useEffect(() => {
        if (user) {
            loadCollections();
        } else {
            setLoading(false);
        }
    }, [user]);

    const loadCollections = async () => {
        try {
            const querySnapshot = await getDocs(query(collectionsRef, where('userId', '==', auth.currentUser.uid)));
            const collectionsData = querySnapshot.docs.map((doc) => {
                return { id: doc.id, name: doc.data().name, imageUrl: doc.data().imageUrl };
            });
            setCollections(collectionsData);
            setLoading(false);
        } catch (error) {
            console.error('Ошибка при загрузке коллекций:', error);
        }
    };

    const addCollection = async () => {
        try {
            if (!newCollectionName) {
                console.log("Введите имя новой коллекции");
                return;
            }
            let imageUrl = '';
            if (image) {
                const imageRef = ref(storage, `collections/${auth.currentUser.uid}/${image.name}`);
                await uploadBytes(imageRef, image);
                imageUrl = await getDownloadURL(imageRef);
            }
            await addDoc(collectionsRef, {
                name: newCollectionName,
                userId: auth.currentUser.uid,
                description: newDescription,
                theme: otherTheme ? otherTheme : newTheme,
                imageUrl: imageUrl,
                tableFields: [],
                author: auth.currentUser.displayName || auth.currentUser.email,
                fieldLimits: {
                    string: 3,
                    integer: 3,
                    text: 3,
                    boolean: 3,
                    date: 3
                },
                itemCount: 0,
                createdAt: new Date()
            });
            setNewCollectionName('');
            setNewDescription('');
            setNewTheme('');
            setImage(null);
            setImagePreview(null);
            loadCollections();
        } catch (error) {
            console.error('Ошибка при добавлении коллекции:', error);
        }
    };

    const deleteCollection = async (collectionId) => {
        try {
            const collectionRef = doc(collectionsRef, collectionId);
            const itemsCollectionRef = collection(collectionRef, 'items');
            const itemsSnapshot = await getDocs(itemsCollectionRef);
            const batch = writeBatch(db);
            itemsSnapshot.forEach((doc) => {
                batch.delete(doc.ref);
            });
            await batch.commit();
            const collectionDoc = await getDoc(collectionRef);
            if (collectionDoc.exists()) {
                const collectionData = collectionDoc.data();
                const imageUrl = collectionData.imageUrl;
                if (imageUrl) {
                    const imageRef = ref(storage, imageUrl);
                    await deleteObject(imageRef);
                    console.log(`Image deleted: ${imageUrl}`);
                }
            }
            await deleteDoc(collectionRef);
            loadCollections();
            console.log(`Collection and its subcollections have been deleted: ${collectionId}`);
        } catch (error) {
            console.error("Error deleting collection and subcollections: ", error);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log("Пользователь вышел из аккаунта");
            navigate('/register');
        } catch (error) {
            console.error("Ошибка при выходе из аккаунта:", error);
        }
    };

    const handleGoToMain = async () => {
        try {
            console.log("Пользователь ушёл на главную странциу");
            navigate('/');
        } catch (error) {
            console.error("Ошибка при переходе на главную страницу:", error);
        }
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return {
        collections,
        newCollectionName,
        newDescription,
        newTheme,
        otherTheme,
        loading,
        user,
        showForm,
        imagePreview,
        handleImageChange,
        addCollection,
        deleteCollection,
        handleSignOut,
        handleGoToMain,
        setNewCollectionName,
        setNewDescription,
        setNewTheme,
        setOtherTheme,
        toggleForm,
    };
};

export default useCollectionManagement;
