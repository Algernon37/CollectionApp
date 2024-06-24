import style from './style/Item.module.sass';
import { Form, Button, Table, Alert } from 'react-bootstrap';
import useFetchItemData from '../../hooks/useFetchItemData/useFetchItemData';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';

const Item = () => {
    const { id, itemId } = useParams();
    const {
        itemData,
        collectionFields,
        editableFields,
        handleSave,
        handleFormItemChange,
        handleDeleteItem,
        handleBooleanItemChange,
        booleanFields,
    } = useFetchItemData(id, itemId);

    if (!itemData) {
        return <h2>Loading...</h2>;
    }

    const getFieldControl = (field) => {
        switch (field.type) {
            case 'string':
                return <Form.Control type="text" placeholder={`Enter ${field.name}`} value={editableFields[field.name]} onChange={(e) => handleFormItemChange(field.name, e.target.value)} />;
            case 'text':
                return <Form.Control as="textarea" rows={3} placeholder={`Enter ${field.name}`} value={editableFields[field.name]} onChange={(e) => handleFormItemChange(field.name, e.target.value)} />;
            case 'boolean':
                return (
                    <>
                        <Form.Check
                            type="checkbox"
                            label="Yes"
                            checked={booleanFields[field.name] === 'yes'}
                            onChange={(e) => handleBooleanItemChange(field.name, e.target.checked ? 'yes' : '')}
                        />
                        <Form.Check
                            type="checkbox"
                            label="No"
                            checked={booleanFields[field.name] === 'no'}
                            onChange={(e) => handleBooleanItemChange(field.name, e.target.checked ? 'no' : '')}
                        />
                    </>
                );
            case 'date':
                return <Form.Control type="date" value={editableFields[field.name]} onChange={(e) => handleFormItemChange(field.name, e.target.value)} />;
            case 'integer':
                return <Form.Control type="number" value={editableFields[field.name]} onChange={(e) => handleFormItemChange(field.name, e.target.value)} />;
            default:
                return <Form.Control type="text" placeholder={`Enter ${field.name}`} value={editableFields[field.name]} onChange={(e) => handleFormItemChange(field.name, e.target.value)} />;
        }
    };

    const formattedCreatedDate = itemData.createdAt ? format(itemData.createdAt.toDate(), 'yyyy-MM-dd HH:mm:ss') : 'No date available';
    const formattedUpdatedDate = itemData.updatedAt ? format(itemData.updatedAt.toDate(), 'yyyy-MM-dd HH:mm:ss') : 'No date available';

    return (
        <div className={style.wrapper}>
            <Alert variant="info">
                <h2 className={style.alertitem}>ID: {itemId}</h2>
                <h2 className={style.alertitem}>Name: {itemData.name}</h2>
                <h2 className={style.alertitem}>Created at: {formattedCreatedDate}</h2>
                <h2 className={style.alertitem}>Last changes: {formattedUpdatedDate}</h2>
            </Alert>
            <Table striped bordered hover variant="primary" className="table">
                <thead>
                    <tr>
                        {collectionFields.map((field, index) => (
                            <th key={index}>{field.name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {collectionFields.map((field, index) => (
                            <td key={index}>{getFieldControl(field)}</td>
                        ))}
                    </tr>
                </tbody>
            </Table>
            <Button onClick={handleSave} variant="primary">Save Item</Button>
            <Button onClick={handleDeleteItem} variant="primary">Delete Item</Button>
            <Button as={Link} to={`/collection/${id}`} variant="primary">Back to Collection</Button>
        </div>
    );
};

export default Item;