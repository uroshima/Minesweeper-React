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
    board: this.newBoard(10),
    status: "Game on",
    mineCount: 10,
  }
  
  // renderBoard() {
  //   return this.state.board.map((row, idxRow) => {
  //     return <div className="row" key={idxRow}>
  //               {row.map((cell, idxCell) => {
  //                 return <div className="cell" key={idxCell} onClick={() => this.isRevealed(cell)}>
  //                           {this.renderCell(cell)}
  //                        </div>
  //               })}
  //            </div>
  //   })
  // }
  
  // isRevealed(cell) {
  //   let myCell = cell;
  //   this.setState(state => {
  //     const list = state.board.map(row => row.map(cell => {
  //       if (myCell === cell) {
  //         cell.isRevealed = true
  //       }
  //     }));
  //     return {
  //       list,
  //     }      
  //   });
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

  // renderCell(cell) {
  //   const initialContents = <span className="cellContents--initial" />
  //   const mineContents = <span className="cellContents--isMine" role="img" aria-label="mine">💣</span>
  //   const clearedContents = <span className="cellContents--isCleared">#</span>
    
  //   if (cell.isMine && cell.isRevealed) {
  //     alert("GAME OVER")
  //     return mineContents
  //   } else if (cell.isRevealed) {
  //     return clearedContents
  //   } else {
  //     return initialContents
  //   }
  // }
  
  // revealAllMines() {

  // }

  // Suggested/optional helper methods:
  //
  // adjacentCells() {}
  //
  // adjacentMinesCount() {}
  //
  // clearCell() {}

  // newBoard(mines) {
  //   const { boardRowsCount, boardColsCount } = this.props
  //   const newBoard = []

  //   for (let r = 0; r < boardRowsCount; r++) {
  //     const row = []
  //     for (let c = 0; c < boardColsCount; c++) {
  //       const cell = {
  //         isMine: Math.floor(Math.random() * 8) === 0,
  //         isRevealed: false,
  //         row: r,
  //         column: c
  //       }
  //       row.push(cell)
  //     }
  //     newBoard.push(row)
  //   }

  //   return newBoard
  // }
  
  newBoard(mines) {
    const { boardRowsCount, boardColsCount } = this.props;
    
    let board = this.createEmptyArray(boardRowsCount, boardColsCount);
    board = this.plantMines(board, mines);
    // board = this.getNeighbours(board);
    
    return board;
  }
  
  createEmptyArray(x, y) {
    let board = [];

    for (let i = 0; i < x; i++) {
      board.push([]);
      for (let j = 0; j < y; j++) {
        board[i][j] = {
          x: i,
          y: j,
          isMine: false,
          minesAround: 0,
          isRevealed: false,
          isEmpty: false,
          isFlagged: false,
        };
      }
    }
    
    return board;
  }

  plantMines(board, mines) {
    const { boardRowsCount, boardColsCount } = this.props
    let randomx, randomy = 0;
    let minesLeft = mines;
    

    while (minesLeft > 0) {
      randomx = Math.floor((Math.random() * 1000) + 1) % boardRowsCount;
      randomy = Math.floor((Math.random() * 1000) + 1) % boardColsCount;
      if (!(board[randomx][randomy].isMine)) {
        board[randomx][randomy].isMine = true;
        minesLeft--;
      }
    }

    return (board);
  }
  
  // resetBoard = () => {
  //   this.setState({ board: this.newBoard() })
  // }
}

export default App
