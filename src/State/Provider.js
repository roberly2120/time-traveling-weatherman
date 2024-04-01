import React, { useState } from 'react';
import AppContext from './Context';

const AppProvider = ({ children }) => {
    const initialState = {
        city: '',
        month: '',
        year: '',
        day: '',
        startDate: '',
        endDate: '',
        images: [],
        headlines: '',
    }
    const [state, setState] = useState(initialState);

    return (
        <AppContext.Provider value={{ state, setState }}>
            {children}
        </AppContext.Provider>
    )
};

export default AppProvider;