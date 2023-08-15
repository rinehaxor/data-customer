import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import filter from '../assets/filter.svg';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';

type TabelDataProps = {
   searchQuery: string; // Tambahkan properti searchQuery
};
type FaqDataItem = {
   id: number;
   title: string;
   description: string;
   createdAt: number;
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

   //sort id
   const sortDataById = () => {
      const sortedData = [...filteredFaqData].sort((a, b) => {
         if (sortDirection === 'asc') {
            return a.id - b.id;
         } else {
            return b.id - a.id;
         }
      });

      setFaqData(sortedData);
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'); // Ubah arah pengurutan
   };
   //sort by create
   const sortDataByCreate = () => {
      const sortedData = [...filteredFaqData].sort((a, b) => {
         const dateA = new Date(a.createdAt);
         const dateB = new Date(b.createdAt);

         if (sortDirection === 'asc') {
            return dateA.getTime() - dateB.getTime();
         } else {
            return dateB.getTime() - dateA.getTime();
         }
      });

      setFaqData(sortedData);
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'); // Ubah arah pengurutan
   };

   //sort title
   const sortDataByTitle = () => {
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

   //sort by description
   const sortDataByDescription = () => {
      const sortedData = [...filteredFaqData].sort((a, b) => {
         if (sortDirection === 'asc') {
            return a.description.localeCompare(b.description);
         } else {
            return b.description.localeCompare(a.description);
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
                     <div className="py-[16px] pr-[13px]" onClick={sortDataById}>
                        <svg width={18} height={12}>
                           <image href={filter} />
                        </svg>
                     </div>
                  </TableHead>
                  <TableHead className="text-white ">
                     <div className="flex justify-between w-[210px]">
                        <div className=" pl-[10px] pt-[10px] text-[16px] ">Title</div>
                        <div className="py-[16px] pr-[13px]" onClick={sortDataByTitle}>
                           <svg width={18} height={12}>
                              <image href={filter} />
                           </svg>
                        </div>
                     </div>
                  </TableHead>
                  <TableHead className="text-white ">
                     <div className="flex justify-center w-[550px]">
                        <div className=" pl-[10px] pt-[10px] text-[16px] pr-[50px] ">Description</div>
                        <div className="py-[16px] pr-[13px]" onClick={sortDataByDescription}>
                           <svg width={18} height={12}>
                              <image href={filter} />
                           </svg>
                        </div>
                     </div>
                  </TableHead>
                  <TableHead className="text-white ">
                     <div className="flex justify-between w-[185px]">
                        <div className=" pl-[10px] pt-[10px] text-[16px] ">Created At</div>
                        <div className="py-[16px] pr-[13px]" onClick={sortDataByCreate}>
                           <svg width={18} height={12}>
                              <image href={filter} />
                           </svg>
                        </div>
                     </div>
                  </TableHead>
                  <TableHead className="text-white w-[104px]">Aksi</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {filteredFaqData.map((faq) => (
                  <TableRow key={faq.id} className="text-center">
                     <TableCell className="border-2">{faq.id}</TableCell>
                     <TableCell className="border-2">{faq.title}</TableCell>
                     <TableCell className="border-2">{faq.description.slice(0, 70)}....</TableCell>
                     <TableCell className="border-2">{faq.createdAt}</TableCell>
                     <TableCell className="border-2">
                        <Dialog>
                           <DialogTrigger asChild>
                              <Button className="bg-[#252C37] w-[84px] h-[24px] ">Detail</Button>
                           </DialogTrigger>
                           <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                 <DialogTitle>Title : {faq.title}</DialogTitle>
                                 <DialogDescription>
                                    <div className=" text-justify text-black">
                                       <Label className="font-bold">Description :</Label> {faq.description}
                                    </div>
                                    <div className=" text-justify text-black">
                                       <Label className="font-bold">Description :</Label> {faq.createdAt}
                                    </div>
                                 </DialogDescription>
                              </DialogHeader>
                           </DialogContent>
                        </Dialog>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   );
}
