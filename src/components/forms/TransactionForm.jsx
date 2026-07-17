import React from 'react';
import Input from '../ui/Input';
import LoadingBtn from '../ui/LoadingBtn';

const TransactionForm = () => {
    return (
        <div className='container-fluid bg-white rounded-3 border shadow-sm p-3 pb-5'>
            <h3>Tushum yoki chiqim kiritish</h3>
            <div className="border-top mt-2 mb-4"></div>
            <form className="row">
                <div className="col-sm-6">
                    <Input
                        label="Kimdan / Kimga"
                        placeholder="Kimdan / Kimga"
                        className="mt-1 mb-3"
                        value={null}
                        onChange={(e) => {}}
                    />
                </div>

                <div className="col-sm-6">
                    <Input
                        label="Sabab"
                        placeholder="Sabab"
                        className="mt-1 mb-3"
                        value={null}
                        onChange={(e) => {}}
                    />
                </div>

                <div className="col-sm-6">
                    <Input
                        label="Pul-Miqdori"
                        placeholder="Pul-Miqdori"
                        className="mt-1 mb-3"
                        value={null}
                        onChange={(e) => {}}
                        type='number'
                    />
                </div>

                <div className="col-sm-6">
                    <label htmlFor="select mt-2">Tanlang</label>
                    <div className="d-flex mt-1">
                        <select name="" id="" className='input text-secondary'>
                            <option>Tushum / chiqim</option>
                            <option value="income">Tushum</option>
                            <option value="expense">Chiqim</option>
                        </select>
                    </div>
                </div>
                <div className="text-end">
                    <LoadingBtn content="Yuborish"/>
                </div>
                
            </form>
        </div>
    )
}

export default TransactionForm