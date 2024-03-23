import { app, db } from "../services/firebaseConfig";
import { collection, getDocs, query, where, doc, getDoc, updateDoc, addDoc, orderBy, deleteDoc } from "firebase/firestore";
import React, {createContext, useContext, useEffect, useState} from 'react';

const FirebaseContext = createContext({})
FirebaseContext.displayName = 'FirebaseContext';

const FirebaseProvider = ({children}) => {

    const [rows, setRows] = useState([]);

    const productsCol = collection(db, 'Products');

    async function fetchDataProducts() {
        const products = await getProducts();
        setRows(products);
    }

    async function getProducts() {
        try {
            const productSnapshot = await getDocs(productsCol);
            const productsList = productSnapshot.docs.map(doc => doc.data());
            return productsList;
        } catch {
            console.error('Erro ao obter os produtos:', error);
            throw error;
        }
    }

    async function setProduct(product) {
        try {
            return await addDoc(productsCol, product)
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            throw error;
        }
    }

    return(
        <FirebaseContext.Provider value={{
            getProducts,
            setProduct,
            rows,
            setRows,
            fetchDataProducts
                }}>
                    {children}
        </FirebaseContext.Provider>
    )
}

export const useFirebase = () => {
    const context = useContext(FirebaseContext)
    if (!context) {
        throw new Error('useFirebase must be used within a FirebaseProvider')
    }
    return context
}

export {FirebaseContext, FirebaseProvider}