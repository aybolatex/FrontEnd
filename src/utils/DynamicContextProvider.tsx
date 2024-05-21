import React, {createContext, useState, ReactNode} from 'react';

interface ContextProps {
    theme: string;
    toggleTheme: () => void;
}

const DynamicContext = createContext<ContextProps | undefined>(undefined);

interface Props {
    children: ReactNode;
}

const DynamicContextProvider: React.FC<Props> = ({children}) => {
    const [theme, setTheme] = useState<string>('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <DynamicContext.Provider value={{theme, toggleTheme}}>
            {children}
        </DynamicContext.Provider>
    );
};

export {DynamicContext, DynamicContextProvider};
