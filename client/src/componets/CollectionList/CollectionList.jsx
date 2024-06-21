import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import style from "./style/CollectionList.module.sass";

function CollectionList({ collections, deleteCollection }) {

    return (
        <ul className={style.collectionUl}>
            {collections.length > 0 && (
                <h2>Your collections:</h2>
            )}
            {collections.map((collection) => (
                <li key={collection.id} className={style.collectionLi}>
                    <Link to={`/collection/${collection.id}`} className={style.collectionLink}>
                        {collection.name}
                    </Link>
                    <div className={style.collectionButtons}>
                        <Button variant="danger" onClick={() => deleteCollection(collection.id)}>
                            Delete
                        </Button>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default CollectionList;