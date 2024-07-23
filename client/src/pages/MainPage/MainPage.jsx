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
        <div className={style.wrapper}>
            <h1 className={style.title}>Main Page</h1>
            <section>
                <h2 className={style.title}>
                    Latest created items
                </h2>
                <ul className={style.itemsList}>
                    {latestItems.map(item => (
                        <li className={style.itemBox} key={item.id}>
                            <p>Name: {item.name}</p>
                            <p>
                                From collection:
                                <Link to={`/collection/${item.collectionId}`}>
                                    {item.collectionName}
                                </Link>
                            </p>
                            <p>Author: {item.createdBy}</p>
                        </li>
                    ))}
                </ul>
            </section>
            <section>
                <h2 className={style.title}>
                    Largest collections
                </h2>
                <ul className={style.collectionsList}>
                    {largestCollections.map(collection => (
                        <li key={collection.id} className={style.collectionBox}>
                            <p>
                                <Link to={`/collection/${collection.id}`}>
                                    {collection.name}
                                </Link>
                            </p>
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

