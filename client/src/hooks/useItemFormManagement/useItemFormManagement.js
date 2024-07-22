import { useState, useMemo } from 'react';
import { db, collection, addDoc, updateDoc, doc, getDoc,auth  } from '../../firebaseConfig';

const useItemFormManagement = (collectionId, fetchItems) => {
    const [itemName, setItemName] = useState('');
    const [fieldValues, setFieldValues] = useState({});
    const [booleanFields, setBooleanFields] = useState({});
    const [integerFields, setIntegerFields] = useState({});
    const collectionRef = useMemo(() => doc(db, 'collections', collectionId), [collectionId]);

    const handleAddItem = async () => {
        if (itemName) {
            try {
                const collectionDoc = await getDoc(collectionRef);
                const collectionData = collectionDoc.data();
                if (!collectionData) {
                    console.error("Коллекция не найдена");
                    return;
                }
                if (!auth.currentUser) {
                    console.error("Пользователь не аутентифицирован");
                    return;
                }
                const newItem = {
                    name: itemName,
                    fields: fieldValues,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    collectionName: collectionData.name,
                    createdBy: auth.currentUser.displayName || auth.currentUser.email
                };
                const itemRef = await addDoc(collection(db, `collections/${collectionId}/items`), newItem);
                await updateDoc(itemRef, {
                    id: itemRef.id
                });
                console.log("Item successfully added with ID: ", itemRef.id);
                const currentItemCount = collectionData.itemCount || 0;
                const newCount = currentItemCount + 1;
                await updateDoc(collectionRef, { itemCount: newCount });

                setItemName('');
                setFieldValues({});
                fetchItems();
            } catch (error) {
                console.error("Error adding item: ", error);
            }
        } else {
            console.log("Please provide an item name.");
        }
    };


    const handleFieldChange = (name, value) => {
        setFieldValues(prev => ({ ...prev, [name]: value }));
    };

    const handleBooleanFieldChange = (fieldName, value) => {
        setBooleanFields(prev => ({ ...prev, [fieldName]: value }));
    };

    const handleIntengerFieldChange = (fieldName, value) => {
        setIntegerFields(prev => ({ ...prev, [fieldName]: value }));
    };

    return {
        itemName,
        handleAddItem,
        setItemName,
        fieldValues,
        handleFieldChange,
        handleBooleanFieldChange,
        booleanFields,
        handleIntengerFieldChange,
        integerFields,
    };
};

export default useItemFormManagement;