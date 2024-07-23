import React from 'react';
import style from './style/FormChangeCollection.module.sass';
import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import useChangeCollection from '../../hooks/useChangeCollection/useChangeCollection'
import ReactMarkdown from 'react-markdown';

const FormChangeCollection = ({
    collectionId,
    collectionRef,
    fetchCollectionAndItemsData
}) => {

    const {
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
        setImage,
        handleCancelEdit
    } = useChangeCollection(collectionId, collectionRef, fetchCollectionAndItemsData);

    return (
        <div>
            {
                showForm ? (
                    <Form className={style.wrapper}>
                        <FormGroup className={style.form}>
                            <FormLabel>Name</FormLabel>
                            <FormControl
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className={style.form}>
                            <FormLabel>Description</FormLabel>
                            <FormControl
                                as="textarea"
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                            />
                        </FormGroup>
                        <div className={style.markdownPreview}>
                            <ReactMarkdown>{newDescription}</ReactMarkdown>
                        </div>
                        <FormGroup className={style.form}>
                            <FormLabel>Theme</FormLabel>
                            {newTheme !== 'Other' ? (
                                <Form.Select onChange={(e) => setNewTheme(e.target.value)} value={newTheme}>
                                    <option value="">Select category...</option>
                                    <option value="Books">Books</option>
                                    <option value="Signs">Signs</option>
                                    <option value="Stamps">Stamps</option>
                                    <option value="Cards">Cards</option>
                                    <option value="Other">Other</option>
                                </Form.Select>
                            ) : (
                                <Form.Control
                                    type="text"
                                    value={otherTheme}
                                    onChange={(e) => setOtherTheme(e.target.value)}
                                    placeholder="Custom category..."
                                />
                            )}
                        </FormGroup>
                        <FormGroup className={style.form}>
                            <FormLabel>Upload Image</FormLabel>
                            <Form.Control
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </FormGroup>
                        <Button onClick={handleEditCollection}>Save</Button>
                        <Button variant="secondary" onClick={handleCancelEdit}>Cancel</Button>
                    </Form >
                ) : (
                    <Button onClick={() => setShowForm(true)}>Edit Collection</Button>
                )}
        </div>
    );
};

export default FormChangeCollection;