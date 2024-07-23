import style from './style/Collection.module.sass';
import { useParams } from 'react-router-dom';
import AdditionalFieldsForm from '../../componets/AdditionalFieldsForm/AdditionalFieldsForm'
import AddItemForm from '../../componets/AddItemForm/AddItemForm';
import FormChangeCollection from '../../componets/FormChangeCollection/FormChangeCollection';
import CollectionInfo from '../../componets/CollectionInfo/CollectionInfo';
import useFetchDataManagement from '../../hooks/useFetchDataManagement/useFetchDataManagement';

function Collection() {
  const { id } = useParams();
  const {
    collectionData,
    fieldLimits,
    collectionRef,
    fields,
    items,
    fetchItems,
    fieldName,
    setFieldName,
    fieldType,
    setFieldType,
    additionalFields,
    handleEditColumnClick,
    handleDeleteColumnClick,
    itemsRef,
    editingFields,
    newFieldName,
    setNewFieldName,
    saveFieldName,
    currentUserId,
  } = useFetchDataManagement(id);

  if (!collectionData) {
    return <h2>Loading...</h2>;
  }

  const isOwner = collectionData.userId === currentUserId;

  return (
    <div className={style.wrapper}>
      <CollectionInfo collectionData={collectionData} />
      {isOwner && (
        <>
          <FormChangeCollection collectionRef={collectionRef} collectionId={id} />
          <div className={style.forms}>
            <AddItemForm
              collectionId={id}
              fields={fields}
              fetchItems={fetchItems}
              editingFields={editingFields}
              handleEditColumnClick={handleEditColumnClick}
              handleDeleteColumnClick={handleDeleteColumnClick}
              newFieldName={newFieldName}
              setNewFieldName={setNewFieldName}
              saveFieldName={saveFieldName}
            />
          </div>
        </>
      )}
      <AdditionalFieldsForm
        fieldLimits={fieldLimits}
        collectionRef={collectionRef}
        fields={fields}
        items={items}
        collectionId={id}
        fieldName={fieldName}
        setFieldName={setFieldName}
        fieldType={fieldType}
        setFieldType={setFieldType}
        additionalFields={additionalFields}
        itemsRef={itemsRef}
        isOwner={isOwner}
      />
    </div>
  );
}

export default Collection;