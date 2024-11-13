import React, { createContext, useContext, useState } from "react";

const PageContext = createContext();

function PageProvider ({children}){
     

    const [searchPage, setSearchPage] = useState(true);  // true -> blogs and false ->listing
    return  (<PageContext.Provider 
        value={{
          searchPage,
          setSearchPage,
        }}
      >
          {children}
      </PageContext.Provider>);            
}

function usePage(){
    const context = useContext(PageContext);
     return context;
}

export { PageProvider, usePage } ;