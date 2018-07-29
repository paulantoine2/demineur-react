import React, {Component} from 'react';
import Case from "./Case";
import Result from "./Result";

class Grid extends Component {
    end_game = false;
    constructor(props) {
        super(props);
        this.reveal = this.reveal.bind(this);
        this.startGame = this.startGame.bind(this);
        this.state = {
            matrix: []
        };

    }

    componentDidMount() {
        this.startGame();
    }

    startGame() {
        this.end_game = false;
        this.setState(() => {
            return {matrix: this.generateMatrix(this.props.height, this.props.width)}
        });
    }

    generateMatrix(height, width) {
        const NB_MINES = 40;

        let matrix = [];
        for (let x = 0; x < width; x++) {
            let column = [];
            for (let y = 0; y < height; y++) {
                column.push({value: null, status: 'hidden'});
            }
            matrix.push(column);
        }
        // Set mines
        let mines = [];
        for (let i = 0; i < NB_MINES; i++) {
            let pos = null;
            do {
                pos = Math.ceil(Math.random() * this.props.width * this.props.height);
            } while (mines.includes(pos));
            mines.push(pos);
        }
        for (let mine_pos of mines) {
            const y = Math.ceil((mine_pos / this.props.width) - 1);
            const x = Math.abs((mine_pos - this.props.width * y) - 1);
            matrix[y][x].value = 'x';
        }
        // Set numbers
        for (let y = 0 ; y < matrix.length ; y++) {
            for (let x = 0 ; x < matrix[y].length ; x++) {
                if (matrix[y][x].value === 'x') continue;
                let number = 0;
                if (matrix[y + 1] && matrix[y + 1][x - 1] && matrix[y + 1][x - 1].value === 'x') number++;
                if (matrix[y - 1] && matrix[y - 1][x].value === 'x') number++;
                if (matrix[y][x - 1] && matrix[y][x - 1].value === 'x') number++;
                if (matrix[y + 1] && matrix[y + 1][x].value === 'x') number++;
                if (matrix[y][x + 1] && matrix[y][x + 1].value === 'x') number++;
                if (matrix[y - 1] && matrix[y - 1][x - 1] && matrix[y - 1][x - 1].value === 'x') number++;
                if (matrix[y + 1] && matrix[y + 1][x + 1] && matrix[y + 1][x + 1].value === 'x') number++;
                if (matrix[y - 1] && matrix[y - 1][x + 1] && matrix[y - 1][x + 1].value === 'x') number++;
                matrix[y][x].value = number;
            }
        }
        return matrix;
    }

    reveal(x, y, final = false) {
        if (this.state.matrix[y] && this.state.matrix[y][x] && this.state.matrix[y][x].status !== 'revealed') {
            this.state.matrix[y][x].status = 'revealed';
            this.setState(() => {
                return { matrix: this.state.matrix }
            });
            if (this.state.matrix[y][x].value === 'x' && !final) {
                this.revealMines();
                this.end_game = <Result result={'lose'} onValidate={this.startGame}/>
            }
            else if (this.state.matrix[y][x].value === 0) {
                this.reveal(x + 1, y);
                this.reveal(x - 1, y);
                this.reveal(x, y - 1);
                this.reveal(x, y + 1);
                this.reveal(x + 1, y + 1);
                this.reveal(x - 1, y + 1);
                this.reveal(x + 1, y - 1);
                this.reveal(x - 1, y - 1);
            }
        }
    }

    revealMines() {
        let matrix = this.state.matrix;
        for (let y = 0 ; y < matrix.length ; y++) {
            for (let x = 0; x < matrix[y].length; x++) {
                if(matrix[y][x].value === 'x')
                    this.reveal(x, y, true);
            }
        }
    }

    toggleFlag(x, y) {
        if (this.state.matrix[y][x].status === 'flagged') {
            this.state.matrix[y][x].status = 'hidden';
        } else if (this.state.matrix[y][x].status !== 'revealed') {
            this.state.matrix[y][x].status = 'flagged';
        }
        this.setState(() => {
            return { matrix: this.state.matrix }
        });
    }


    render() {
        return (
            <div className="grid">
                {this.state.matrix.map((y, i) =>
                    y.map((x, j) =>
                        <Case
                            key={(i + 1) * (j + 1)}
                            value={x.value}
                            status={x.status}
                            onReveal={() => this.reveal(j, i)}
                            onFlag={() => this.toggleFlag(j, i)}
                        />
                    )
                )}
                {this.end_game}
            </div>
        );
    }
}

export default Grid;