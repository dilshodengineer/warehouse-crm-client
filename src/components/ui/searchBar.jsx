import React from 'react';
import Input from "./Input";

function SearchBar({ value, onChange, onSubmit}) {
  return (
    <div className="d-flex gap-2">
      <Input className="rounded-5 border-primary" placeholder='Qidiruv...'/>
      <button className="btn btn-primary rounded-5">Qidirish</button>
    </div>
  );
}

export default SearchBar;