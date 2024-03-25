import React, { useState } from 'react';
import AppContext from './Context';

const AppProvider = ({ children }) => {
    const initialState = {
        city: '',
        startDate: '',
        endDate: '',
        images: [],
    }
    const [state, setState] = useState(initialState);

    return (
        <AppContext.Provider value={{ state, setState }}>
            {children}
        </AppContext.Provider>
    )
};

export default AppProvider;