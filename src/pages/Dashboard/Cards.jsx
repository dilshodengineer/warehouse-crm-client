import React from 'react';
import StatisticsCard from '../../components/ui/StatisticsCard';

const Cards = ({ cards }) => {
    
    
  return (
    <div className='row mt-2'>
        {
            cards.map((card) => (
                <StatisticsCard key={card.id} title={card.title} unit={card.unit} count={card.count} />
            ))
        }
    </div>
  )
}

export default Cards;