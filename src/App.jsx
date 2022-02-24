import React from 'react'
import { useState } from 'react';
import './App.css';

const App = () => {
 const [boards, setBoards] = useState([

  {id: 1, title: "TODO", items:[{id:1, title: "work"}, {id:2, title: "shop"}, {id:3, title: "sport"}]},
  {id: 2, title: "In Progress", items: [{id:1, title: "sleep"}, {id:2, title: "homework"}]},
  {id: 1, title: "Testing", items: [{id:1, title: "walk with pets"}, {id:2, title: "make a new project"}]},
  {id: 1, title: "Done", items: [{id:1, title: "morning eat"}, {id:2, title: "cook dinner"}, {id:3, title: "paint"}]},

 ])

const [currentBoard, setCurrentBoard] = useState(null)
const [currentItem, setCurrentItem] = useState(null)

 function dragOverHandler(e) {
  e.preventDefault()
  if (e.target.className == 'item') {
    e.target.style.boxShadow = '0 4px 3px gray'
  }
 }

 function dragLeaveHandler(e) {
  e.target.style.boxShadow = 'none'
 }

 function dragStartHandler(e, board, item) {
setCurrentBoard(board)
setCurrentItem(item)
 }

 function dragEndHandler(e) {
  e.target.style.boxShadow = 'none'
 }


 function dropHandler(e, board, item) {
  e.preventDefault()
  const currentIndex = currentBoard.items.indexOf(currentItem)
  currentBoard.items.splice(currentIndex, 1)
  const dropIndex = board.items.indexOf(item)
  board.items.splice(dropIndex + 1, 0, currentItem)
  setBoards(boards.map(b => {
    if (b.id === board.id){
    return board
    }
    if (b.id === currentBoard.id){
    return currentBoard
    }
    return b
  }))
  e.target.style.boxShadow = 'none'
 }

 function dropCardHandler(e, board) {
   board.items.push(currentItem)
  const currentIndex = currentBoard.items.indexOf(currentItem)
  currentBoard.items.splice(currentIndex, 1)
  setBoards(boards.map(b => {
    if (b.id === board.id){
    return board
    }
    if (b.id === currentBoard.id){
    return currentBoard
    }
    return b
  }))
  e.target.style.boxShadow = 'none'
}

  return (
    <div className="App">
     {boards.map(board =>
      <div 
      className='board'
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => dropCardHandler(e, board)}
      >
      <div className="board__title">{board.title}</div>
      {board.items.map(item => 
        <div
        onDragOver={(e) => dragOverHandler(e)}
        onDragLeave={e => dragLeaveHandler(e)}
        onDragStart={(e) => dragStartHandler(e, board, item)}
        onDragEnd={(e) => dragEndHandler(e)}
        onDrop={(e) => dropHandler(e, board, item)}
        className="todo"
        draggable={true} 
        className="item"
        >
          {item.title}
          </div>
        )}
      </div>
      )}
    </div>
  );
}

export default App;
