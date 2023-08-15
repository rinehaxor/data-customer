import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import filter from '../assets/filter.svg';
import { Button } from './ui/button';

type TabelDataProps = {
   searchQuery: string; // Tambahkan properti searchQuery
};
type FaqDataItem = {
   id: number;
   title: string;
   description: string;
   createdAt: string;
   // Jika ada properti lain, tambahkan di sini
};
export default function TableData({ searchQuery }: TabelDataProps) {
   const [faqData, setFaqData] = useState<FaqDataItem[]>([]);
   const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

   const fetchData = async () => {
      try {
         const api: string = process.env.REACT_APP_MOCK_API || '';
         console.log(api);
         const res = await fetch(api);
         const json = await res.json();
         setFaqData(json.map((item: FaqDataItem) => ({ ...item, expanded: false })));
      } catch (error) {
         console.log(error);
      }
   };
   useEffect(() => {
      fetchData();
   }, []);

   const filteredFaqData = faqData.filter((faq) => faq.title.toLowerCase().includes(searchQuery.toLowerCase()));

   const sortData = () => {
      const sortedData = [...filteredFaqData].sort((a, b) => {
         if (sortDirection === 'asc') {
            return a.title.localeCompare(b.title);
         } else {
            return b.title.localeCompare(a.title);
         }
      });

      setFaqData(sortedData);
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'); // Ubah arah pengurutan
   };
   return (
      <div>
         <Table className="rounded-md overflow-hidden h-[44px] mt-[20px]">
            <TableHeader className="">
               <TableRow className="bg-[#667080] ">
                  <TableHead className="text-white flex justify-between w-[151px]">
                     <div className=" pl-[10px] pt-[10px] text-[16px] ">ID</div>
                     <div className="py-[16px] pr-[13px]">
                        <svg width={18} height={12}>
                           <image href={filter} onClick={() => console.log('e')} />
                        </svg>
                     </div>
                  </TableHead>
                  <TableHead className="text-white ">
                     <div className="flex justify-between w-[210px]">
                        <div className=" pl-[10px] pt-[10px] text-[16px] ">Title</div>
                        <div className="py-[16px] pr-[13px]" onClick={sortData}>
                           <svg width={18} height={12}>
                              <image href={filter} onClick={() => console.log('e')} />
                           </svg>
                        </div>
                     </div>
                  </TableHead>
                  <TableHead className="text-white ">
                     <div className="flex justify-center w-[550px]">
                        <div className=" pl-[10px] pt-[10px] text-[16px] pr-[50px] ">Description</div>
                        <div className="py-[16px] pr-[13px]">
                           <svg width={18} height={12}>
                              <image href={filter} onClick={() => console.log('e')} />
                           </svg>
                        </div>
                     </div>
                  </TableHead>
                  <TableHead className="text-white ">
                     <div className="flex justify-between w-[185px]">
                        <div className=" pl-[10px] pt-[10px] text-[16px] ">Created At</div>
                        <div className="py-[16px] pr-[13px]">
                           <svg width={18} height={12}>
                              <image href={filter} onClick={() => console.log('e')} />
                           </svg>
                        </div>
                     </div>
                  </TableHead>
                  <TableHead className="text-white w-[104px]">Aksi</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {filteredFaqData.map((faq) => (
                  <TableRow key={faq.id}>
                     <TableCell>{faq.id}</TableCell>
                     <TableCell>{faq.title}</TableCell>
                     <TableCell>{faq.description}</TableCell>
                     <TableCell>{faq.createdAt}</TableCell>
                     <TableCell>
                        <Button className="bg-[#252C37]">Aksi</Button>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   );
}
