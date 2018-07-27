import React, {Component} from 'react';
import Case from "./Case";

class Grid extends Component {
  matrix = [];
  constructor(props) {
    super(props);
    this.matrix = this.generateMatrix(props.height, props.width);
    this.setMines(20);

  }

  generateMatrix(height, width) {
    let matrix = [];
    for (let x = 0; x < width; x++) {
      let column = [];
      for (let y = 0; y < height; y++) {
        column.push(null);
      }
      matrix.push(column);
    }
    return matrix;
  }

  setMines(number) {
    let mines = [];
    for (let i = 0; i < number; i++) {
      let pos = null;
      do {
        pos = Math.ceil(Math.random() * this.props.width * this.props.height);
      } while (mines.includes(pos));
      mines.push(pos);
    }
    for (let mine_pos of mines) {
      const y = Math.ceil((mine_pos / this.props.width) - 1);
      const x = Math.abs((mine_pos - this.props.width * y) - 1);
      this.matrix[y][x] = 'x';
    }
  }



  render() {
    return (
      <div>
        {[...Array(this.props.width)].map((x, i) =>
          <Case key={i}/>
        )}
      </div>
    );
  }
}

export default Grid;