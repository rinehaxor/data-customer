import React, { useState } from 'react';
import TableData from '../components/TabelData';
import Header from '../components/Header';

export default function Home() {
   const [searchQuery, setSearchQuery] = useState<string>('');

   const handleSearch = (query: string) => {
      setSearchQuery(query);
   };
   return (
      <div>
         <Header onSearch={handleSearch} />
         <TableData searchQuery={searchQuery} />
      </div>
   );
}
