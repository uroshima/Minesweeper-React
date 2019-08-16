import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Cell from './Cell';

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
  
  resetBoard = () => {
    this.setState({ board: this.newBoard(10) })
  }
  
    
  renderBoard(board) {
    return board.map((boardrow) => {
      return <div className="row">
                {boardrow.map((boarditem) => {
                  return (
                    <div className="cell" key={boarditem.x * boardrow.length + boarditem.y}>
                      <Cell
                        onClick={() => console.log(boarditem)}
                        cMenu={(e) => console.log("DOUBLE CLICK")}
                        value={boarditem}
                      />
                      {/* {(boardrow[boardrow.length - 1] === boarditem) ? <div className="clear" /> : ""} */}
                      {/* <span className="cellContents--initial" /> */}
                    </div>);
                    
              })}
             </div>
    });
  }
  //   const initialContents = <span className="cellContents--initial" />
  //   const mineContents = <span className="cellContents--isMine" role="img" aria-label="mine">💣</span>
  //   const clearedContents = <span className="cellContents--isCleared">#</span>
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
        {this.renderBoard(this.state.board)}
          {/* <div className="row">{this.renderCell()}</div> */}
        </main>
      </div>
    )
  }
}

export default App
