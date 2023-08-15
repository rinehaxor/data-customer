import React, { useState, ChangeEvent } from 'react';
import search from '../assets/Search.svg';
import { Button } from './ui/button';

type HeaderProps = {
   onSearch: (query: string) => void;
};
export default function Header({ onSearch }: HeaderProps) {
   const [searchQuery, setSearchQuery] = useState('');

   const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
   };

   const handleSearchClick = () => {
      onSearch(searchQuery);
   };
   return (
      <div className="flex flex-row h-[30px]">
         <h1 className="font-semibold text-xl">FAQ</h1>

         <div className="ml-4 flex items-center border-2 border-[#CFD3D4] w-[405px] rounded-md">
            <div className="mx-[4.5px] my-[4.5px]">
               <img src={search} alt="search" className="w-[15px] h-[16px]" />
            </div>
            <input type="text" placeholder="Cari berdasarkan judul" className="px-2 py-1 h-[15px] text-xs w-[353px] outline-none" value={searchQuery} onChange={handleSearchChange} />
         </div>
         <Button className="ml-[10px] w-[50px] h-[30px] bg-[#1F437A]" onClick={handleSearchClick}>
            Cari
         </Button>
      </div>
   );
}
