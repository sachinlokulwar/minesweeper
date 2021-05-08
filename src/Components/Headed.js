import React from 'react';
import {MinesweeperConstants} from '../Constants/MinesweeperConstants';
const Header = (props) => {
    return (
        <div>
            <div>
                Rows : {MinesweeperConstants.ROWS}, Column: {MinesweeperConstants.COLUMNS}, Bombs: {MinesweeperConstants.BOMBS}
            </div>
        </div>
    )
}

export default Header;