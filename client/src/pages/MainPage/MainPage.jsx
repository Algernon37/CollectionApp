import style from './style/MainPage.module.sass'
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebaseConfig';
import useManageMainPage from '../../hooks/useManageMainPage/useManageMainPage'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function MainPage() {
    const {
        latestItems,
        largestCollections,
        loading
    } = useManageMainPage();
    const [user, loadingAuth] = useAuthState(auth);

    if (loading || loadingAuth) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>
            <h1>Main Page</h1>
            <section>
                <h2>
                    Latest created items
                </h2>
                <ul>
                    {latestItems.map(item => (
                        <li key={item.id}>
                            <p>Name: {item.name}</p>
                            <p>From collection: {item.collectionName}</p>
                            <p>Author: {item.createdBy}</p>
                        </li>
                    ))}
                </ul>
            </section>
            <section>
                <h2>
                    Largest collections
                </h2>
                <ul>
                    {largestCollections.map(collection => (
                        <li key={collection.id}>
                            <p>Name: {collection.name}</p>
                        </li>
                    ))}
                </ul>
            </section>
            <Button
                as={Link}
                to={user ? `/UsersCollections` : `/register`}
                variant="primary"
            >
                {user ? 'Go to your collections' : 'Register'}
            </Button>
        </div>
    );
};

export default MainPage;