export const getPageNumbers = (currentPage, lastPage) => {
  const pages = [];

  if (lastPage <= 7) {
     for (let i = 1; i <= lastPage; i++){
       pages.push(i);
     }

     return pages;
  };

  pages.push(1);

  if (currentPage > 4){
    pages.push("...");
  };

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(lastPage - 1, currentPage + 1);

  for (let i = start; i <= end; i ++){
    pages.push(i);
  };

  if (currentPage < lastPage - 3){
    pages.push("...");
  };

  pages.push(lastPage);

  return pages;
}