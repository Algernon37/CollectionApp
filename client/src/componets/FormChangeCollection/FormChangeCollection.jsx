import React from 'react';
import style from './style/FormChangeCollection.module.sass';
import { Button, Form, FormControl, FormGroup, FormLabel, FormSelect } from 'react-bootstrap';
import useChangeCollection from '../../hooks/useChangeCollection/useChangeCollection'

const FormChangeCollection = ({
    collectionId,
    collectionRef
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
    } = useChangeCollection(collectionId, collectionRef);

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
                        <FormGroup className={style.form}>
                            <FormLabel>Theme</FormLabel>
                            <FormSelect
                                value={newTheme}
                                onChange={(e) => setNewTheme(e.target.value)}
                            >
                                <option value="Books">Books</option>
                                <option value="Signs">Signs</option>
                                <option value="Stamps">Stamps</option>
                                <option value="Cards">Cards</option>
                                <option value="Other">Other</option>
                            </FormSelect>
                        </FormGroup>
                        <Button onClick={handleEditCollection}>Save</Button>
                    </Form >
                ) : (
                    <Button onClick={() => setShowForm(true)}>Edit Collection</Button>
                )}
        </div>
    );
};

export default FormChangeCollection;