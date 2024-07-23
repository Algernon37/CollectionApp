import React from 'react';
import style from './style/AdditionalFieldsForm.module.sass';
import { Form, Button, Table, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdditionalFieldsForm = ({
    fieldLimits,
    fields,
    items,
    collectionId,
    fieldName,
    setFieldName,
    fieldType,
    setFieldType,
    additionalFields,
    isOwner
}) => {
    const filteredFields = fields.filter(field => field.type === 'string' || field.type === 'date');
    return (
        <div className={style.wrapper}>
            {isOwner && (
                <>
                    <Alert variant="info">
                        Remaining fields to add: <br />
                        String: {fieldLimits.string}<br />
                        Integer: {fieldLimits.integer}<br />
                        Text: {fieldLimits.text}<br />
                        Boolean: {fieldLimits.boolean}<br />
                        Date: {fieldLimits.date}
                    </Alert>
                    <Form className={style.control}>
                        <Form.Group controlId="fieldName">
                            <Form.Label>Field name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter field name"
                                value={fieldName}
                                onChange={(e) => setFieldName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="fieldType">
                            <Form.Label>Field type</Form.Label>
                            <Form.Select
                                value={fieldType}
                                onChange={(e) => setFieldType(e.target.value)}
                            >
                                <option value="string" disabled={fieldLimits.string === 0}>String</option>
                                <option value="integer" disabled={fieldLimits.integer === 0}>Integer</option>
                                <option value="text" disabled={fieldLimits.text === 0}>Text</option>
                                <option value="boolean" disabled={fieldLimits.boolean === 0}>Boolean</option>
                                <option value="date" disabled={fieldLimits.date === 0}>Date</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" onClick={additionalFields}>
                            Add a field
                        </Button>
                    </Form>
                </>
            )}
            <div className={style.tableContainer}>
                <Table striped bordered hover variant="primary" className={style.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            {filteredFields.map((field, index) => (
                                <th key={index} className={`${style.fieldName} ${style.tableHeader}`}>
                                    {field.name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <Link to={`/collection/${collectionId}/items/${item.id}`} className={style.itemLink}>
                                        {item.name}
                                    </Link>
                                </td>
                                {filteredFields.map((field, fieldIndex) => (
                                    <td key={fieldIndex}>{item.fields[field.name]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <Button as={Link} to={`/UsersCollections`} variant="primary">
                Go to your collections
            </Button>
        </div >
    );
}

export default AdditionalFieldsForm;