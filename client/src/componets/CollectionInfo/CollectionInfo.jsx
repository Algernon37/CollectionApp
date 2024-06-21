import style from "./style/CollectionInfo.module.sass";
import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from "react";

function CollectionInfo({ collectionData }) {
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        if (collectionData.imageUrl) {
            const img = new Image();
            img.src = collectionData.imageUrl;
            img.onload = () => setImageLoaded(true);
        }
    }, [collectionData.imageUrl]);

    return (
        <>
            <h2 className={style.header}>{collectionData.name}</h2>
            <h3>Theme: {collectionData.theme}</h3>
            <ReactMarkdown className={style.description}>{collectionData.description}</ReactMarkdown>
            {
                collectionData.imageUrl && (
                    <div className={style.imageContainer}>
                        {imageLoaded ? (
                            <img src={collectionData.imageUrl} alt="Collection photo" className={style.imagePreview} />
                        ) : (
                            <h4 className={style.imagePlaceholder}>
                                Uploading an image...
                            </h4>
                        )}
                    </div>
                )
            }
        </>
    );
}

export default CollectionInfo;