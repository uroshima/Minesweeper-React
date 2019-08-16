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
    /* Helper Functions */

  // get mines
  getMines(board) {
    let mineArray = [];

    board.map(boardrow => {
      boardrow.map((boarditem) => {
        if (boarditem.isMine) {
          mineArray.push(boarditem);
        }
      });
    });

    return mineArray;
  }

  // get Flags
  getFlags(board) {
    let flagsArray = [];

    board.map(boardrow => {
      boardrow.map((boarditem) => {
        if (boarditem.isFlagged) {
          flagsArray.push(boarditem);
        }
      });
    });

    return flagsArray;
  }

  // get Hidden cells
  getHidden(board) {
    let hiddenArray = [];

    board.map(boardrow => {
      boardrow.map((boarditem) => {
        if (!boarditem.isRevealed) {
          hiddenArray.push(boarditem);
        }
      });
    });

    return hiddenArray;
  }

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
  
  getNeighbours(board) {
    const { boardRowsCount, boardColsCount } = this.props;
    let updatedBoard = board;

    for (let i = 0; i < boardRowsCount; i++) {
      for (let j = 0; j < boardColsCount; j++) {
        if (board[i][j].isMine !== true) {
          let mines = 0;
          const area = this.traverseBoard(board[i][j].x, board[i][j].y, board);
          area.map(value => {
            if (value.isMine) {
              mines++;
            }
          });
          if (mines === 0) {
            updatedBoard[i][j].isEmpty = true;
          }
          updatedBoard[i][j].minesAround = mines;
        }
      }
    }
    
    return (updatedBoard);
  };
  
   // looks for neighbouring cells and returns them
   traverseBoard(x, y, board) {
    const { boardRowsCount, boardColsCount } = this.props;
    const el = [];

    //up
    if (x > 0) {
      el.push(board[x - 1][y]);
    }

    //down
    if (x < boardRowsCount - 1) {
      el.push(board[x + 1][y]);
    }

    //left
    if (y > 0) {
      el.push(board[x][y - 1]);
    }

    //right
    if (y < boardColsCount - 1) {
      el.push(board[x][y + 1]);
    }

    // top left
    if (x > 0 && y > 0) {
      el.push(board[x - 1][y - 1]);
    }

    // top right
    if (x > 0 && y < boardColsCount - 1) {
      el.push(board[x - 1][y + 1]);
    }

    // bottom right
    if (x < boardRowsCount - 1 && y < boardColsCount - 1) {
      el.push(board[x + 1][y + 1]);
    }

    // bottom left
    if (x < boardRowsCount - 1 && y > 0) {
      el.push(board[x + 1][y - 1]);
    }

    return el;
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
