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
    
    return (
      <div
        onClick={onClick}
        className={className}
        onContextMenu={cMenu}
      >
        {this.getValue()}
      </div>
    );
  }
}