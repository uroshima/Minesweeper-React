import React from 'react';
import PropTypes from 'prop-types';

export default class Cell extends React.Component {
  static propTypes = {
    value: PropTypes.object,
    onClick: PropTypes.func,
    cMenu: PropTypes.func,
    isRevealed: PropTypes.bool,
    isMine: PropTypes.bool,
    isFlagged: PropTypes.bool
  }
  
  getValue() {
    const { value } = this.props;

    if (!value.isRevealed) {
      return this.props.value.isFlagged ? "🚩" : null;
    }
    if (value.isMine) {
      return "💣";
    }
    if (value.minesAround === 0) {
      return null;
    }
    // console.log("value.minesAround: ", value.minesAround)
    return <div>{value.minesAround}</div>
}

  render() {
    const { value, onClick, cMenu } = this.props;
    let className;
    
    if (!value.isRevealed) {
        className = "cellContents--initial";
    } else if (value.isMine) {
        className = "cellContents--isMine"
    } else {
        className = "cellContents--isCleared"
    }
    
    //   (value.isRevealed ? "" : "cellContents--initial") +
    //   (value.isMine ? "cellContents--isMine" : "") +
    //   (value.isFlagged ? " is-flag" : "");

    return (
      <div
        onClick={onClick}
        className={className}
        onContextMenu={cMenu}
      >
      {/* {console.log(this.getValue())} */}
        {this.getValue()}
      </div>
    );
  }
}
  //   const initialContents = <span className="cellContents--initial" />
  //   const mineContents = <span className="cellContents--isMine" role="img" aria-label="mine">💣</span>
  //   const clearedContents = <span className="cellContents--isCleared">#</span>