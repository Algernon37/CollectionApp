import { useState, useEffect, useMemo } from 'react';
import { db, getDoc, doc, updateDoc, deleteDoc } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const useFetchItemData = (id, itemId) => {
    const [itemData, setItemData] = useState(null);
    const [collectionFields, setCollectionFields] = useState([]);
    const [editableFields, setEditableFields] = useState({});
    const [booleanFields, setBooleanFields] = useState({});
    const [updatedAt, setUpdatedAt] = useState(null);
    const navigate = useNavigate();

    const collectionRef = useMemo(() => doc(db, 'collections', id), [id]);
    const itemRef = useMemo(() => doc(db, `collections/${id}/items`, itemId), [itemId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const collectionDoc = await getDoc(collectionRef);
                if (collectionDoc.exists()) {
                    const collectionData = collectionDoc.data();
                    setCollectionFields(collectionData.tableFields || []);
                } else {
                    console.log('Коллекция не найдена');
                }
                const itemDoc = await getDoc(itemRef);
                if (itemDoc.exists()) {
                    setItemData(itemDoc.data());
                    setEditableFields(itemDoc.data().fields || {});
                } else {
                    console.log('Документ элемента не найден');
                }
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        };
        fetchData();
    }, [id, itemId, updatedAt]);

    const handleDeleteItem = async () => {
        try {
            await deleteDoc(itemRef);
            const collectionDoc = await getDoc(collectionRef);
            const collectionData = collectionDoc.data();
            const currentItemCount = collectionData.itemCount || 0;
            const newCount = currentItemCount - 1;
            await updateDoc(collectionRef, { itemCount: newCount });
            console.log('Документ удалён');
            navigate(`/collection/${id}`);
        } catch (error) {
            console.error('Ошибка при удалении:', error);
        }
    };

    const handleSave = async () => {
        try {
            const updatedTime = new Date();
            setUpdatedAt(updatedTime);
            await updateDoc(itemRef, {
                fields: editableFields,
                updatedAt: updatedTime
            });
            console.log('Item successfully updated');
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    const handleFormItemChange = (fieldName, value) => {
        setEditableFields(prev => ({ ...prev, [fieldName]: value }));
    };

    const handleBooleanItemChange = (fieldName, value) => {
        setBooleanFields(prev => ({ ...prev, [fieldName]: value }));
    };

    return {
        itemData,
        collectionFields,
        editableFields,
        handleSave,
        handleFormItemChange,
        handleDeleteItem,
        handleBooleanItemChange,
        booleanFields
    };
};

export default useFetchItemData;
