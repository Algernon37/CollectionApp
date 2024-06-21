import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import style from "./style/CollectionForm.module.sass";
import ReactMarkdown from 'react-markdown';

function CollectionForm({ newCollectionName, newDescription, newTheme, otherTheme,
    addCollection, setNewCollectionName, setNewDescription,
    setNewTheme, setOtherTheme, toggleForm, imagePreview, handleImageChange }) {

    const handleAddCollection = () => {
        addCollection();
        toggleForm();
    };

    return (
        <Form>
            <Form.Group className={style.control}>
                <Form.Control
                    type="text"
                    placeholder="New collection"
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                />
                <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Description (Markdown supported)"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                />
                <div className={style.markdownPreview}>
                    <ReactMarkdown>{newDescription}</ReactMarkdown>
                </div>
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
                <Form.Group>
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {imagePreview && (
                        <div className={style.imageContainer}>
                            <img src={imagePreview} alt="Preview" className={style.imagePreview} />
                        </div>
                    )}
                </Form.Group>
                <Button variant="primary" onClick={handleAddCollection}>
                    Add a collection
                </Button>
            </Form.Group>
        </Form>
    )
}

export default CollectionForm;