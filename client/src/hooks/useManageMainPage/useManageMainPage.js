import { collection, query, orderBy, limit, getDocs, db } from "../../firebaseConfig";
import { useState, useEffect } from 'react';

const useManageMainPage = () => {
    const [latestItems, setLatestItems] = useState([]);
    const [largestCollections, setLargestCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const collectionsRef = collection(db, 'collections');

    async function fetchData() {
        const items = await fetchLatestItems();
        setLatestItems(items);
        const collections = await fetchLargestCollections();
        setLargestCollections(collections);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchLatestItems() {
        try {
            const collectionsSnapshot = await getDocs(query(collectionsRef));

            if (collectionsSnapshot.empty) {
                return [];
            }

            const itemsPromises = collectionsSnapshot.docs.map(async (collectionDoc) => {
                const itemsRef = collection(collectionDoc.ref, 'items');
                const itemsQuery = query(itemsRef, orderBy('createdAt', 'desc'), limit(5));
                const itemsSnapshot = await getDocs(itemsQuery);

                return itemsSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
            });

            const itemsArray = await Promise.all(itemsPromises);
            return itemsArray.flat();
        } catch (error) {
            console.error("Ошибка при получении последних айтемов:", error);
            return [];
        }
    }
    
    async function fetchLargestCollections() {
        try {
            const querySnapshot = await getDocs(query(collectionsRef, orderBy('itemCount', 'desc'), limit(5)));
            const collections = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return collections;
        } catch (error) {
            console.error("Ошибка при получении самых больших коллекций:", error);
            return [];
        }
    }
    return {
        latestItems,
        largestCollections,
        loading
    };
}
export default useManageMainPage;
