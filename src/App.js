import React,{ useState, useEffect } from 'react'
import './App.css'
import SingleCard from './components/single_card/SingleCard'

const cardImages =[
  {"src":"/img/helmet.png", matched:false},
  {"src":"/img/potion.png", matched:false},
  {"src":"/img/ring.png", matched:false},
  {"src":"/img/scroll.png", matched:false},
  {"src":"/img/shield.png", matched:false},
  {"src":"/img/sword.png", matched:false}
]

function App() {

  const[cards,setCards]= useState([])
  const[turns,setTurns]= useState(0)
  const[choiceOne,setChoiceOne]=useState(null)
  const[choiceTwo,setChoiceTwo]=useState(null)
  const[disabled,setDisabled]= useState(false)

// shuffle cards
  const shuffleCards=()=>{

    const shuffleCards =[...cardImages, ...cardImages]
    .sort(()=> Math.random() - 0.5)
    .map((card) => ({ ...card , id:Math.random()}))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffleCards)  // To store cards
    setTurns(0) // Whenever it clicks NewGame Button we can access the shuffle card function
  }
  
// handle choice
  const handleChoice= (card)=>{
   choiceOne ? setChoiceTwo(card) : setChoiceOne(card)  // if choiceOne is false it will execute choiceTwo
  }

// Compare 2 cards

  useEffect(()=>{
    
    if(choiceOne && choiceTwo)
    {
      setDisabled(true)

      if(choiceOne.src=== choiceTwo.src){
        setCards(prevCards =>{             // Matching Cards
          return prevCards.map(card => {
            if(card.src === choiceOne.src){
              return{...card, matched:true}
            }
            else{
              return card
            }
          })
        })
        console.log("Match found")
        resetTurn()
      }
      else{
        console.log("Not Match")
        setTimeout(()=>  resetTurn(),1000)
      }
    }

  },[choiceOne,choiceTwo])
  console.log(cards)


// Reset Choices & increases turn

  const resetTurn = ()=>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns +1)
    setDisabled(false)
  }
// Start a new game automatically
  useEffect(()=>{
    shuffleCards()
  },[])

  return (
    <>
    
    <div className="App">
      <h1> Matching Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card =>(
          <SingleCard 
          key={card.id} 
          card={card}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
          />
        ))}
        </div>
        <p>Turns:{turns}</p>

    </div>
    <footer>Developed by <a href="github.com/varshathgupta"> Varshath Gupta S</a></footer>
    </>
  );
}

export default App