import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './App.css'

const BOARD_SIZE = 7
const RESET_BUTTON_TEXT = 'New game'

class App extends Component {
  static propTypes = {
    boardRowsCount: PropTypes.number.isRequired,
    boardColsCount: PropTypes.number.isRequired,
  }

  static defaultProps = {
    boardRowsCount: BOARD_SIZE,
    boardColsCount: BOARD_SIZE,
  }

  state = {
    board: this.newBoard(),
  }
  
  renderBoard() {
    return this.state.board.map((row, idxRow) => {
      return <div className="row" key={idxRow}>
                {row.map((cell, idxCell) => {
                  return <div className="cell" key={idxCell} onClick={() => this.isRevealed(cell)}>
                            {this.renderCell(cell)}
                         </div>
                })}
             </div>
    })
  }
  
  isRevealed(cell) {
    let myCell = cell;
    this.setState(state => {
      const list = state.board.map(row => row.map(cell => {
        if (myCell === cell) {
          cell.isRevealed = true
        }
      }));
      return {
        list,
      }      
    });
    // console.log(this.state)
    // return this.renderCell(cell);
  }
  
  // toggleCell(cell) {
  //   let content = cell.isMine;
  //   // console.log(cell)
    
  //   const mineContents = (
  //     <div className="cellContents--isMine" role="img" aria-label="mine">
  //       💣
  //     </div>
  //   )
  //   if (content === true) {
  //     console.log("inside mine")
  //     return <div className="cell">{mineContents}</div>
  //   }
  // }
  
  render() {
    console.table(
      this.state.board.map((row) => row.map((cell) => JSON.stringify(cell)))
    )

    return (
      <div className="App">
        <button className="resetButton" onClick={this.resetBoard}>
          {RESET_BUTTON_TEXT}
        </button>
        <main className="board">
        {this.renderBoard()}
          {/* <div className="row">{this.renderCell()}</div> */}
        </main>
      </div>
    )
  }

  renderCell(cell) {
    const initialContents = <span className="cellContents--initial" />
    const mineContents = <span className="cellContents--isMine" role="img" aria-label="mine">💣</span>
    const clearedContents = <span className="cellContents--isCleared">#</span>
    
    // console.log("this.isRevealed(cell): ")
    if (cell.isMine && cell.isRevealed) {
      // console.log(this)
      // this.revealAllMines()
      alert("GAME OVER")
      return mineContents
    } else if (cell.isRevealed) {
      return clearedContents
    } else {
      return initialContents
    }
    // return <span className="cell">{initialContents}</span>
  }
  
  revealAllMines() {
    // console.log("revealAllMines")
    // this.setState(state => {
    //   const list = state.board.map(row => row.map(cell => {
    //     cell.isRevealed =
    //   }));
    //   return {
    //     list,
    //   }      
    // });
  }

  // Suggested/optional helper methods:
  //
  // adjacentCells() {}
  //
  // adjacentMinesCount() {}
  //
  // clearCell() {}

  newBoard() {
    const { boardRowsCount, boardColsCount } = this.props

    const newBoard = []

    for (let r = 0; r < boardRowsCount; r++) {
      const row = []
      for (let c = 0; c < boardColsCount; c++) {
        // Suggestion: const isMine = Math.floor(Math.random() * 8) === 0
        const cell = {
          isMine: Math.floor(Math.random() * 8) === 0,
          isRevealed: false,
          row: r,
          column: c
        }
        row.push(cell)
      }
      newBoard.push(row)
    }

    return newBoard
  }

  resetBoard = () => {
    this.setState({ board: this.newBoard() })
  }
}

export default App
