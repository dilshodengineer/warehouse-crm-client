import React from 'react';
import StatisticsCard from '../../components/ui/StatisticsCard';

const Cards = ({ cards }) => {


  return (
    <div className='row mt-2 border-bottom pb-4'>
      <h5 className='mb-0 mt-3 border-bottom pb-2 fw-semibold'>Umumiy ko'rsatgichlar</h5>

      {
        cards.map((card, index) => (
          <StatisticsCard key={index} index={index} title={card.title} unit={card.unit} count={card.count} />
        ))
      }
    </div>
  )
}

export default Cards;