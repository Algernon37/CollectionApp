import React from 'react';
import style from './style/AddItemForm.module.sass';
import { Form, Button } from 'react-bootstrap';
import useItemFormManagement from '../../hooks/useItemFormManagement/useItemFormManagement';

const AddItemForm = ({
    collectionId,
    fields,
    handleDeleteColumnClick,
    handleEditColumnClick,
    editingFields,
    newFieldName,
    setNewFieldName,
    fetchItems,
    saveFieldName,
}) => {
    const {
        itemName,
        handleAddItem,
        setItemName,
        fieldValues,
        handleFieldChange,
        handleBooleanFieldChange,
        booleanFields,
        handleIntengerFieldChange,
        integerFields,
    } = useItemFormManagement(collectionId, fetchItems);

    const getFieldControl = (field) => {
        switch (field.type) {
            case 'string':
                return <Form.Control type="text" placeholder={`Enter ${field.name}`} value={fieldValues[field.name] || ''} onChange={(e) => handleFieldChange(field.name, e.target.value)} />;
            case 'text':
                return <Form.Control as="textarea" rows={3} placeholder={`Enter ${field.name}`} value={fieldValues[field.name] || ''} onChange={(e) => handleFieldChange(field.name, e.target.value)} />;
            case 'boolean':
                return (
                    <>
                        <Form.Check
                            type="checkbox"
                            label="Yes"
                            checked={booleanFields[field.name] === 'yes'}
                            onChange={(e) => handleBooleanFieldChange(field.name, e.target.checked ? 'yes' : '')}
                        />
                        <Form.Check
                            type="checkbox"
                            label="No"
                            checked={booleanFields[field.name] === 'no'}
                            onChange={(e) => handleBooleanFieldChange(field.name, e.target.checked ? 'no' : '')}
                        />
                    </>
                );
            case 'date':
                return <Form.Control type="date" value={fieldValues[field.name] || ''} onChange={(e) => handleFieldChange(field.name, e.target.value)} />;
            case 'integer':
                return <Form.Control type="number" value={integerFields[field.name] || ''} onChange={(e) => handleIntengerFieldChange(field.name, e.target.value)}
                />;
            default:
                return <Form.Control type="text" placeholder={`Enter ${field.name}`} value={fieldValues[field.name] || ''} onChange={(e) => handleFieldChange(field.name, e.target.value)} />;
        }
    };

    return (
        <div className={style.wrapper}>
            <Form className={style.control}>
                <Form.Group controlId="itemName">
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter item name"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                </Form.Group>
                {fields.map((field, index) => (
                    <Form.Group key={index}>
                        <div className={style.fieldControl}>
                            {editingFields[field.name] ? (
                                <div>
                                    <Form.Control
                                        type="text"
                                        value={newFieldName}
                                        onChange={(e) => setNewFieldName(e.target.value)}
                                    />
                                    <Button
                                        variant="primary"
                                        onClick={() => saveFieldName(field.name, newFieldName)}
                                        className={style.saveColumnButton}
                                    >
                                        Save
                                    </Button>
                                </div>
                            ) : (
                                <div>
                                    {field.name}
                                    <div className={style.ColumnButtons}>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleDeleteColumnClick(field.name)}
                                            className={style.deleteColumnButton}
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            variant="warning"
                                            onClick={() => handleEditColumnClick(field.name)}
                                            className={style.editColumnButton}
                                        >
                                            Edit
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                        {getFieldControl(field)}
                    </Form.Group>
                ))}
                <Button onClick={handleAddItem}>
                    Add Item
                </Button>
            </Form>
        </div>
    );
};

export default AddItemForm;