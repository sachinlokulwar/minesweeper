import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {MinesweeperConstants} from '../Constants/MinesweeperConstants';
import './style.css';
const Minesweeper = (props) => {
    const [gameData, setGameData] = useState([]);
    const [gameEnd, setGameEnd] = useState(false);
    const initGameData = () => {
        const data = [];
        for(let i=0;i<MinesweeperConstants.ROWS; i++) {
            data[i] = []
            for (let j=0;j<MinesweeperConstants.COLUMNS; j++) {
                data[i][j] = {
                    open: false,
                    bomb: false,
                    adjecentBombs: 0
                }
            }
        }
        insertBombs(data);
    }

    const insertBombs = (data) => {
        for(let i=0;i<MinesweeperConstants.BOMBS; i++) {
            addBomb(data);
        }
        setGameData(data);
    }

    const addBomb = (data) => {
        const i = Math.floor(Math.random() * MinesweeperConstants.ROWS); ;
        const j = Math.floor(Math.random() * MinesweeperConstants.COLUMNS); ;
        if(data[i][j].bomb) {
            addBomb(data);
        } else {
            data[i][j].bomb = true;
        }
    } 

    useEffect (() => {
        initGameData()
    }, [])

    const handleClick = (i,j) => {
        if(gameEnd) {
            return;
        }
        if(gameData[i][j].bomb) {
            setGameEnd(true);
            const data = [...gameData];
            data[i][j].open = true;
            data[i][j].adjecentBombs = 0;
            setGameData(data);
            alert("Bomb Explodes..., Game end")
            return;
        }
        let bombs = 0;
        for (let row = Math.max(0, i-1); row < Math.min(i+2, MinesweeperConstants.ROWS); row ++) {
            for (let col = Math.max(0, j-1); col < Math.min(j+2, MinesweeperConstants.COLUMNS); col ++) {
                if(gameData[row][col].bomb) {
                    bombs += 1;
                }
            }
        }
        const data = [...gameData];
        data[i][j].open = true;
        data[i][j].adjecentBombs = bombs;
        setGameData(data);
        if(bombs === 0) {
            clickAdjecentBombs(i, j);
        }
    }

    const clickAdjecentBombs = (i, j) => {
        for (let row = Math.max(0, i-1); row < Math.min(i+2, MinesweeperConstants.ROWS); row ++) {
            for (let col = Math.max(0, j-1); col < Math.min(j+2, MinesweeperConstants.COLUMNS); col ++) {
                if(!(row === i && col === j) && !gameData[row][col].open && !gameData[row][col].bomb) {
                    handleClick(row, col);
                }
            }
        }
    }

    const getColumnClass = (item) => {
        if(!item.open) {
            return 'closed-column';
        }
        if(item.bomb) {
            return 'bomb-column';
        }
        if(!item.adjecentBombs) {
            return 'no-bomb-column';
        }
    }

    const restartGame = () => {
        setGameEnd(false);
        initGameData()
    }

    return (
        <div>
            <div className={`game-container ${gameEnd ? 'game-end' : ''}`}>
                {gameData && gameData.map((items, index) => {
                    return (
                    <div className="game-row">
                        {items.map((subItems, sIndex) => {
                        return <div className={`game-column ${getColumnClass(subItems)}`} onClick={() => handleClick(index, sIndex)}> 
                            {(subItems.open && subItems.bomb) ? <span>&#128163;</span> : <span>{subItems.adjecentBombs}</span>}
                        </div>;
                        })}
                    </div>
                    );
                })}
            </div>
            <div className="game-footer">
                <Button variant="contained" color="primary" onClick={restartGame}>
                    Restart
                </Button>
            </div>
        </div>
    )
}

export default Minesweeper;