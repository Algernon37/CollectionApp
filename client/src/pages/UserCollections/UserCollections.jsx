import style from "./style/UserCollections.module.sass";
import CollectionForm from "../../componets/CollectionForm/CollectionForm";
import useCollectionManagement from '../../hooks/useCollectionManagement/useCollectionManagement';
import CollectionList from '../../componets/CollectionList/CollectionList'
import Button from 'react-bootstrap/Button';

function UserCollections() {
    const { collections, newCollectionName, newDescription, newTheme, otherTheme,
        loading, user, showForm, imagePreview, handleImageChange, addCollection,
        deleteCollection, handleSignOut, handleGoToMain,
        setNewCollectionName, setNewDescription, setNewTheme, setOtherTheme,
        toggleForm } = useCollectionManagement();
        handleImageChange
    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className={style.wrapper}>
            <div className={style.userAuthenticated}>
                {user ? (
                    <h2>user: {user.email}</h2>
                ) : (
                    <h2>The user is not authenticated.</h2>
                )}
                <div className={style.buttons}>
                    <Button onClick={handleSignOut}>Go out</Button>
                    <Button onClick={handleGoToMain}>Go to Main page</Button>
                </div>
            </div>
            {showForm ? (
                <CollectionForm
                    newCollectionName={newCollectionName}
                    newDescription={newDescription}
                    newTheme={newTheme}
                    otherTheme={otherTheme}
                    addCollection={addCollection}
                    setNewCollectionName={setNewCollectionName}
                    setNewDescription={setNewDescription}
                    setNewTheme={setNewTheme}
                    setOtherTheme={setOtherTheme}
                    toggleForm={toggleForm}
                    imagePreview={imagePreview}
                    handleImageChange={handleImageChange}
                />
            ) : (
                <Button onClick={toggleForm}>Create Collection</Button>
            )}
            <CollectionList
                collections={collections}
                deleteCollection={deleteCollection}
            />
        </div>
    );
}


export default UserCollections;
