import { useState, useEffect, useMemo } from 'react';
import { db, getDoc, doc, collection, getDocs, updateDoc } from '../../firebaseConfig';

const useFetchDataManagement = (id) => {
    const [collectionData, setCollectionData] = useState(null);
    const [fieldLimits, setFieldLimits] = useState({});
    const [fields, setFields] = useState([]);
    const [items, setItems] = useState([]);
    const [fieldName, setFieldName] = useState('');
    const [fieldType, setFieldType] = useState('string');
    const [editingFields, setEditingFields] = useState({});
    const [newFieldName, setNewFieldName] = useState('');
    const [itemsChanged, setItemsChanged] = useState(false);

    const collectionRef = useMemo(() => doc(db, 'collections', id), [id]);
    const itemsRef = useMemo(() => collection(collectionRef, 'items'), [collectionRef]);

    const fetchCollectionAndItemsData = async () => {
        try {
            const collectionDoc = await getDoc(collectionRef);
            if (collectionDoc.exists()) {
                const data = collectionDoc.data();
                setCollectionData(data);
                setFieldLimits(data.fieldLimits || {});
                setFields(data.tableFields || []);
            } else {
                console.log('Документ не найден');
            }
            const itemsSnapshot = await getDocs(itemsRef);
            const itemsData = itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setItems(itemsData);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    };

    useEffect(() => {
        fetchCollectionAndItemsData();
    }, [id, itemsChanged]);

    const fetchItems = () => {
        setItemsChanged(prev => !prev);
    };

    const additionalFields = async () => {
        try {
            if (fieldName === '') {
                console.log('Название поля не может быть пустым');
                return;
            }
            if (fieldName.length > 15) {
                console.log('Название поля должно содержать не более 20 символов');
                return;
            }
            if (fieldLimits[fieldType] <= 0) {
                console.log('Превышено количество полей данного типа');
                return;
            }
            const isFieldNameUnique = !fields.some(field => field.name === fieldName);
            if (!isFieldNameUnique) {
                console.log('Поле с таким именем уже существует');
                return;
            }
            const updatedFields = [...fields, { name: fieldName, type: fieldType }];
            const updatedFieldLimits = {
                ...fieldLimits,
                [fieldType]: fieldLimits[fieldType] - 1
            };
            await updateDoc(collectionRef, {
                tableFields: updatedFields,
                fieldLimits: updatedFieldLimits
            });
            setFields(updatedFields);
            setFieldLimits(updatedFieldLimits);
            setFieldName('');
            console.log('Поле успешно добавлено');
        } catch (error) {
            console.error('Ошибка при добавлении поля:', error);
        }
    };

    const handleDeleteColumnClick = async (fieldName) => {
        try {
            const docSnapshot = await getDoc(collectionRef);
            if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                const tableFields = data.tableFields;
                const fieldToDelete = tableFields.find(field => field.name === fieldName);
                const updatedFields = tableFields.filter(field => field.name !== fieldName);
                const updatedFieldLimits = { ...fieldLimits };
                if (fieldToDelete) {
                    updatedFieldLimits[fieldToDelete.type] = (updatedFieldLimits[fieldToDelete.type] || 0) + 1;
                }
                await updateDoc(collectionRef, {
                    tableFields: updatedFields,
                    fieldLimits: updatedFieldLimits
                });
                setFields(updatedFields);
                setFieldLimits(updatedFieldLimits);
                console.log('Поле успешно удалено');
            }
        } catch (error) {
            console.error('Ошибка при удалении поля:', error);
        }
    };

    const handleEditColumn = async (oldFieldName, newFieldName) => {
        try {
            if (newFieldName === '') {
                console.log('Название поля не может быть пустым');
                return;
            }
            if (newFieldName.length > 15) {
                console.log('Название поля должно содержать не более 20 символов');
                return;
            }
            const docSnapshot = await getDoc(collectionRef);
            if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                const tableFields = data.tableFields;
                const isFieldNameUnique = !tableFields.some(field => field.name === newFieldName);
                if (!isFieldNameUnique) {
                    console.log('Поле с таким именем уже существует');
                    return;
                }
                const fieldIndex = tableFields.findIndex(field => field.name === oldFieldName);
                if (fieldIndex === -1) {
                    throw new Error(`Поле ${oldFieldName} не найдено в коллекции`);
                }
                const updatedFields = [...tableFields];
                updatedFields[fieldIndex].name = newFieldName;
                await updateDoc(collectionRef, {
                    tableFields: updatedFields
                });
                console.log('Имя столбца успешно изменено');
                setFields(updatedFields);
            }
        } catch (error) {
            console.error('Ошибка при изменении имени поля:', error);
        }
    };

    const startEditing = (fieldName) => {
        setEditingFields((prevEditingFields) => ({
            ...prevEditingFields,
            [fieldName]: true,
        }));
        setNewFieldName(fieldName);
    };

    const stopEditing = (fieldName) => {
        setEditingFields((prevEditingFields) => {
            const updatedEditingFields = { ...prevEditingFields };
            delete updatedEditingFields[fieldName];
            return updatedEditingFields;
        });
    };

    const saveFieldName = async (oldFieldName, newFieldName) => {
        if (newFieldName && newFieldName.length <= 15) {
            await handleEditColumn(oldFieldName, newFieldName);
            stopEditing(oldFieldName);
        } else {
            console.log('Название поля не может быть пустым и должно содержать не более 15 символов');
        }
    };

    const handleEditColumnClick = (fieldName) => {
        if (editingFields[fieldName]) {
            saveFieldName(fieldName, newFieldName);
        } else {
            startEditing(fieldName);
        }
    };

    return {
        collectionData,
        fieldLimits,
        collectionRef,
        fields,
        items,
        fieldName,
        setFieldName,
        fieldType,
        fetchItems,
        setFieldType,
        additionalFields,
        handleDeleteColumnClick,
        handleEditColumnClick,
        itemsRef,
        editingFields,
        startEditing,
        saveFieldName,
        newFieldName,
        setNewFieldName,
    };
};

export default useFetchDataManagement;


