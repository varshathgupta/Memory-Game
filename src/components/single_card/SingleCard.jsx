import React from 'react'
import "./singleCard.css"

export default function SingleCard({card, handleChoice, flipped, disabled }) {
    function handleClick(){
        if(!disabled){
            handleChoice(card)

        }
        

    }
  return (
    <div className="card" key={card.id}>
            <div className={flipped ? "flipped":""}>
              <img className="frontImage" src={card.src} alt='cardFrontImage' />
              <img 
              className="backgroundImage" 
              alt="cardBackgroundImage" 
              src="/img/cover.png" 
              onClick={handleClick} />
          </div>
        </div>
  )
}
