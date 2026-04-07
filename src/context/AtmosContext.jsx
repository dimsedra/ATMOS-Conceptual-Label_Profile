import { createContext, useContext, useState, useEffect } from 'react';

const AtmosContext = createContext();

export function AtmosProvider({ children }) {
  const [bagItems, setBagItems] = useState([]);
  const [isBagOpen, setIsBagOpen] = useState(false);

  const addToBag = (product, size = "M") => {
    const item = { ...product, size, bagId: Date.now() };
    setBagItems(prev => [...prev, item]);
    setIsBagOpen(true); // Open sidebar automatically on add
  };

  const removeFromBag = (bagId) => {
    setBagItems(prev => prev.filter(item => item.bagId !== bagId));
  };

  const toggleBag = () => setIsBagOpen(!isBagOpen);

  return (
    <AtmosContext.Provider value={{
      bagItems,
      addToBag,
      removeFromBag,
      isBagOpen,
      setIsBagOpen,
      toggleBag
    }}>
      {children}
    </AtmosContext.Provider>
  );
}

export function useAtmos() {
  return useContext(AtmosContext);
}
