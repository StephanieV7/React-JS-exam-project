import { useState } from "react";

export default function usePersistedState(key, defaultValue) {
    const [state, setState] = useState(()=> {
        const persistedState = localStorage.getItem(key);

        if(persistedState) {
            return JSON.parse(persistedState); //това ще е началната стойност на стейта
        }

        return defaultValue;
    }); //калкулира началния стейт, изпълнява се само при маунт

    const setPersistedState = (value) => {
        setState(value);
        
        let serializedValue;
        
        //имаме функция, когато искаме да се базираме на стария стейт, за да променим с новия стейт
        if (typeof value === 'function') {
            serializedValue = JSON.stringify(value(state))
        } else {
            serializedValue = JSON.stringify(value)
        }
        

        localStorage.setItem(key, serializedValue);
    };

    return([
        state,
        setPersistedState
    ])

}
//четем от локал сторидж само и единствено при рефреш