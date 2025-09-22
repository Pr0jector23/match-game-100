import {useState} from 'react'
import Card from './Card'

//https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1025.png

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements arr[i] and arr[j]
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getRandomInt(min, max) { // both inclusive
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateList = () => {
    let used = []
    let newList = []
    let newId = 1
    let picId = getRandomInt(1, 1025)
    for (let i = 1; i < 101; i++) { //101 for 100
        //console.log(newId)
        newList.push({ 
            id: newId, 
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${picId}.png`, 
            state: "" })
        if (i % 2 == 0) {
            newId ++
            used.push(picId)
            while (true) {
                picId = getRandomInt(1, 1025)
                if (used.includes(picId) === false) break
            }
        }
    }
    console.log(newList)
    return shuffleArray(newList)
}

// [
//             { id: 1, img: '/img/html.png', state: "" },
//             { id: 1, img: '/img/html.png', state: "" },
//             { id: 2, img: '/img/css.png', state: "" },
//             { id: 2, img: '/img/css.png', state: "" },
//             { id: 3, img: '/img/js.png', state: "" },
//             { id: 3, img: '/img/js.png', state: "" },
//             { id: 4, img: '/img/scss.png', state: "" },
//             { id: 4, img: '/img/scss.png', state: "" },
//             { id: 5, img: '/img/react.png', state: "" },
//             { id: 5, img: '/img/react.png', state: "" },
//             { id: 6, img: '/img/vue.png', state: "" },
//             { id: 6, img: '/img/vue.png', state: "" },
//             { id: 7, img: '/img/angular.png', state: "" },
//             { id: 7, img: '/img/angular.png', state: "" },
//             { id: 8, img: '/img/nodejs.png', state: "" },
//             { id: 8, img: '/img/nodejs.png', state: "" }
//         ]

//.sort(() => Math.random() - 0.5)



const Cards = ({gameWon}) => {



    const [items, setItems] = useState(
        () => generateList()
    )

    const checkIfWin = () => {
        //console.log(items)
        for(let i = 0; i < items.length; i++)
            if (items[i].state != "correct") return
        
        const timer = setTimeout( () => {
            gameWon()
        }, 1000)
    }

    const [prev, setPrev] = useState(-1)    

    const checkIfMatch = (c) => {
        if (items[c].id == items[prev].id) {
            items[c].state = "correct"
            items[prev].state = "correct"
            setItems([...items])
            setPrev(-1)
            checkIfWin()
        }
        else {
            items[c].state = "wrong"
            items[prev].state = "wrong"
            setItems([...items])
            setPrev(-1)
            const timer = setTimeout( () => {
                items[c].state = ""
                items[prev].state = ""
                setItems([...items])
            }, 1000)
        }
    }

    const handleClick = (indx) => {
        if (items[indx].state == "active" || items[indx].state == "correct" || items[indx].state == "wrong") return
        if (prev === -1) {
            items[indx].state = "active"
            setItems([...items])
            setPrev(indx)
        }
        else {
            checkIfMatch(indx)
        }
    }

    return(
        <div className="container">
            {items.map((item, index) => (
                <Card key = {index} item = {item} indx = {index} handleClick = {handleClick}></Card>
            ))}
        </div>
    )
}

export default Cards