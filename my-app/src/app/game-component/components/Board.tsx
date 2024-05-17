'use client';

import { useState } from "react"
import { StaticImageData } from 'next/image';

import wP from '../images/white-pawn.png';
import bP from '../images/black-pawn.png';
import wR from '../images/white-rook.png';
import bR from '../images/black-rook.png';
import wN from '../images/white-knight.png';
import bN from '../images/black-knight.png';
import wB from '../images/white-bishop.png';
import bB from '../images/black-bishop.png';
import wK from '../images/white-king.png';
import bK from '../images/black-king.png';
import wQ from '../images/white-queen.png';
import bQ from '../images/black-queen.png';
import blank from '../images/blank.png'
import next from "next";

export function Board() {
    const [board, setBoard] = useState(boardInit());
    const [oldBoard, setOldBoard] = useState(boardInit());
    const [pieceSelected, setPieceSeleted] = useState(Array<number>());
    const [WhiteTurn, setWhiteTurn] = useState(true);
    const [inCheck, setInCheck] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const handleClickOnPiece = ({r, c}:{r:number, c:number}) => {
        var p = board[r*8+c];
        if (WhiteTurn) {
            if (inCheck) {
                if (p == 'checkwK') handleSelectKing({r,c});
                else return;
            }
            switch (p) {
                case 'wP': handleSelectWhitePawn({r,c}); break;
                case 'wK': handleSelectKing({r,c}); break;
                case 'wN': handleSelectKnight({r,c}); break;
                case 'wB': handleSelectBishop({r,c}); break;
            }
        }
        else {
            if (inCheck) {
                if (p == 'checkbK') handleSelectKing({r,c});
                else return;
            }
            switch (p) {
                case 'bP': handleSelectBlackPawn({r,c}); break;
                case 'bK': handleSelectKing({r,c}); break;
                case 'bN': handleSelectKnight({r,c}); break;
                case 'bB': handleSelectBishop({r,c}); break;
            }
        }
    }
    const handleMovePiece = ({r, c} : {r:number, c:number}) => {
        var p = board[pieceSelected[0]*8 + pieceSelected[1]];
        
        switch(p) {
            case 'wP': handleMovePawn({r,c}); break;
            case 'bP': handleMovePawn({r,c}); break;
            case 'bK': handleMoveKing({r,c}); break;
            case 'wK': handleMoveKing({r,c}); break;
            case 'checkbK': handleMoveKing({r,c}); break;
            case 'checkbK': handleMoveKing({r,c}); break;
            case 'wN': handleMoveKnight({r,c}); break;
            case 'bN': handleMoveKnight({r,c}); break;
            case 'wB': handleMoveBishop({r,c}); break;
            case 'bB': handleMoveBishop({r,c}); break;
        }

    }

    const handleSelectBishop = ({r, c}:{r:number, c:number}) => {
        let validMoveBoard = oldBoard.slice();
        diagonalMoves({r,c,validMoveBoard});
        setBoard(validMoveBoard);
        setPieceSeleted(Array<number>(r,c));
    }
    const handleMoveBishop = ({r,c}: {r:number, c:number}) => {
        const nextBoard = oldBoard.slice();
        nextBoard[r*8+c] = (WhiteTurn ? 'wB' : 'bB');
        nextBoard[pieceSelected[0]*8+pieceSelected[1]] = 'Blank';
        diagonalCheck({r,c,nextBoard});
        setBoard(nextBoard);
        setOldBoard(nextBoard);
        setWhiteTurn(!WhiteTurn);

    }

    const handleSelectKnight = ({r,c}:{r:number, c:number}) => {
        const validMoveBoard = oldBoard.slice();

        if (r+2 < 8) {
            if (c-1 >= 0 && board[(r+2)*8+(c-1)] == 'Blank') validMoveBoard[(r+2)*8+(c-1)] = 'valid';
            else if (c-1 >= 0 && board[(r+2)*8+(c-1)].charAt(0) == (WhiteTurn ? "b" : "w")) validMoveBoard[(r+2)*8+(c-1)] = 'attack';
            if (c+1 < 8 && board[(r+2)*8+(c+1)] == 'Blank') validMoveBoard[(r+2)*8+(c+1)] = 'valid';
            else if (c+1 < 8 && board[(r+2)*8+(c+1)].charAt(0) == (WhiteTurn ? "b" : "w")) validMoveBoard[(r+2)*8+(c+1)] = 'attack';
        }
        if (r-2 >= 0) {
            if (c-1 >= 0 && board[(r-2)*8+(c-1)] == 'Blank') validMoveBoard[(r-2)*8+(c-1)] = 'valid';
            else if (c-1 >= 0 && board[(r-2)*8+(c-1)].charAt(0) == (WhiteTurn ? "b" : "w")) validMoveBoard[(r-2)*8+(c-1)] = 'attack';
            if (c+1 < 8 && board[(r-2)*8+(c+1)] == 'Blank') validMoveBoard[(r-2)*8+(c+1)] = 'valid';
            else if (c+1 < 8 && board[(r-2)*8+(c+1)].charAt(0) == (WhiteTurn ? "b" : "w")) validMoveBoard[(r-2)*8+(c+1)] = 'attack';
        }
        if (c+2 < 8) {
            if (r-1 >= 0 && board[(r-1)*8+(c+2)] == 'Blank') validMoveBoard[(r-1)*8+(c+2)] = 'valid';
            else if (r-1 >= 0 && board[(r-1)*8+(c+2)].charAt(0) == (WhiteTurn ? "b" : "w")) validMoveBoard[(r-1)*8+(c+2)] = 'attack';
            if (r+1 < 8 && board[(r+1)*8+(c+2)] == 'Blank') validMoveBoard[(r+1)*8+(c+2)] = 'valid';
            else if (r+1 < 8 && board[(r+1)*8+(c+2)].charAt(0) == (WhiteTurn ? "b" : "w")) validMoveBoard[(r+1)*8+(c+2)] = 'attack';
        }
        if (c-2 >= 0) {
            if (r-1 >= 0 && board[(r-1)*8+(c-2)] == 'Blank') validMoveBoard[(r-1)*8+(c-2)] = 'valid';
            else if (r-1 >= 0 && board[(r-1)*8+(c-2)].charAt(0) == (WhiteTurn ? "b" : "w")) validMoveBoard[(r-1)*8+(c-2)] = 'attack';
            if (r+1 < 8 && board[(r+1)*8+(c-2)] == 'Blank') validMoveBoard[(r+1)*8+(c-2)] = 'valid';
            else if (r+1 < 8 && board[(r+1)*8+(c-2)].charAt(0) == (WhiteTurn ? "b" : "w")) validMoveBoard[(r+1)*8+(c-2)] = 'attack';
        }
        setBoard(validMoveBoard);
        setPieceSeleted(Array<number>(r,c));
    }


    const handleMoveKnight = ({r,c}:{r:number, c:number}) => {
        const nextBoard = oldBoard.slice();
        nextBoard[r*8+c] = (WhiteTurn ? 'wN' : 'bN');
        nextBoard[pieceSelected[0]*8+pieceSelected[1]] = 'Blank';

        if (r+2 < 8) {
            if (c-1 >= 0 && board[(r+2)*8+(c-1)] == (WhiteTurn ? "bK" : "wK")) nextBoard[(r+2)*8+(c-1)] =  (WhiteTurn ? "checkbK" : "checkwK"), setInCheck(true);
            if (c+1 < 8 && board[(r+2)*8+(c+1)] == (WhiteTurn ? "bK" : "wK")) nextBoard[(r+2)*8+(c+1)] =  (WhiteTurn ? "checkbK" : "checkwK"), setInCheck(true);
        }
        if (r-2 >= 0) {
            if (c-1 >= 0 && board[(r-2)*8+(c-1)] == (WhiteTurn ? "bK" : "wK")) nextBoard[(r-2)*8+(c-1)] =  (WhiteTurn ? "checkbK" : "checkwK"), setInCheck(true);
            if (c+1 < 8 && board[(r-2)*8+(c+1)] == (WhiteTurn ? "bK" : "wK")) nextBoard[(r-2)*8+(c+1)] =  (WhiteTurn ? "checkbK" : "checkwK"), setInCheck(true);
        }
        if (c+2 < 8) {
            if (r-1 >= 0 && board[(r-1)*8+(c+2)] == (WhiteTurn ? "bK" : "wK")) nextBoard[(r-1)*8+(c+2)] = (WhiteTurn ? "checkbK" : "checkwK"), setInCheck(true);
            if (r+1 < 8 && board[(r+1)*8+(c+2)] == (WhiteTurn ? "bK" : "wK")) nextBoard[(r+1)*8+(c+2)] =  (WhiteTurn ? "checkbK" : "checkwK"), setInCheck(true);
        }
        if (c-2 >= 0) {
            if (r-1 >= 0 && board[(r-1)*8+(c-2)].charAt(0) == (WhiteTurn ? "bK" : "wK")) nextBoard[(r-1)*8+(c-2)] = (WhiteTurn ? "checkbK" : "checkwK"), setInCheck(true);
            if (r+1 < 8 && board[(r+1)*8+(c-2)].charAt(0) == (WhiteTurn ? "bK" : "wK")) nextBoard[(r+1)*8+(c-2)] = (WhiteTurn ? "checkbK" : "checkwK"), setInCheck(true);
        }

        setBoard(nextBoard);
        setOldBoard(nextBoard);
        setWhiteTurn(!WhiteTurn);
    }

    const handleSelectKing = ({r,c}:{r:number, c:number}) => {
        const validMoveBoard = oldBoard.slice();
        let noMove = true;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (r+i < 0 || r+i == 8 || c+j < 0 || c+j == 8 || (i == 0 && j == 0)) continue;
                const checkValid = (r+i)*8+(c+j);
                if (board[checkValid] == "Blank") {
                    validMoveBoard[checkValid] = 'valid'
                    noMove = false;
                }
                else if (board[checkValid].charAt(0) == (WhiteTurn ? 'b' : 'w')) {
                    validMoveBoard[checkValid] = 'attack'
                    noMove = false;
                }
            }
        }
        if (noMove && inCheck) {
            setGameOver(true);
            return;
        }
        else {
            setInCheck(false);
            setBoard(validMoveBoard);
            setPieceSeleted(Array<number>(r,c));
        }
    }


    const handleMoveKing = ({r,c}:{r:number, c:number}) => {
        const nextBoard = oldBoard.slice();
        nextBoard[r*8+c] = (WhiteTurn ? 'wK' : 'bK');
        nextBoard[pieceSelected[0]*8+pieceSelected[1]] = 'Blank';
        setBoard(nextBoard);
        setOldBoard(nextBoard);
        setInCheck(false)
        setWhiteTurn(!WhiteTurn);
    }


    const handleMovePawn = ({r,c}:{r:number, c:number}) => {
        const nextBoard = oldBoard.slice();
        nextBoard[r*8+c] = board[pieceSelected[0]*8+pieceSelected[1]];
        nextBoard[pieceSelected[0]*8+pieceSelected[1]] = 'Blank';

        if (WhiteTurn) {
            if (c != 0 && board[(r-1)*8+(c-1)] == 'bK') nextBoard[(r-1)*8+(c-1)] = 'checkbK', setInCheck(true);
            if (c != 7 && board[(r-1)*8+(c+1)] == 'bK') nextBoard[(r-1)*8+(c+1)] = 'checkbK', setInCheck(true);
        }
        else {
            if (c != 0 && board[(r+1)*8+(c-1)] == 'wK') nextBoard[(r+1)*8+(c-1)] = 'checkwK', setInCheck(true);
            if (c != 7 && board[(r+1)*8+(c+1)] == 'wK') nextBoard[(r+1)*8+(c+1)] = 'checkwK', setInCheck(true);
        }

        setBoard(nextBoard);
        setOldBoard(nextBoard);
        setWhiteTurn(!WhiteTurn);
    }

    const handleSelectBlackPawn = ({r, c}:{r:number, c:number}) => {
        const validMoveBoard = oldBoard.slice();
        if (r == 1) {
            if (board[(r+2)*8+c] == 'Blank' && board[(r+1)*8+c] == 'Blank') {
                validMoveBoard[(r+2)*8+c] = 'valid';
                validMoveBoard[(r+1)*8+c] = 'valid';
            }
        }
        else {
            if (board[(r+1)*8+c] == 'Blank') {
                if (r+1 == 7) validMoveBoard[(r+1)*8+c] = 'promotion';
                else validMoveBoard[(r+1)*8+c] = 'valid';
            }
        }
        if (c != 0 && board[(r+1)*8+(c-1)].charAt(0) == 'w') {
            if (r+1 == 7) validMoveBoard[(r+1)*8+(c-1)] = 'promotion';
            else validMoveBoard[(r+1)*8+(c-1)] = 'attack';
        } 
        if (c != 7 && board[(r+1)*8+(c+1)].charAt(0) == 'w') {
            if (r+1 == 7) validMoveBoard[(r+1)*8+(c+1)] = 'promotion';
            else validMoveBoard[(r+1)*8+(c+1)] = 'attack';
        } 
        setBoard(validMoveBoard);
        setPieceSeleted(Array<number>(r,c));
    }
    const handleSelectWhitePawn = ({r, c}:{r:number, c:number}) => {
        const validMoveBoard = oldBoard.slice();
        if (r == 6) {
            if (board[(r-2)*8+c] == 'Blank' && board[(r-1)*8+c] == 'Blank') {
                validMoveBoard[(r-2)*8+c] = 'valid';
                validMoveBoard[(r-1)*8+c] = 'valid';
            }
        }
        else {
            if (board[(r-1)*8+c] == 'Blank') {
                if (r-1 == 0) validMoveBoard[(r-1)*8+c] = 'promotion';
                else validMoveBoard[(r-1)*8+c] = 'valid';
            }
        }
        if (c != 0 && board[(r-1)*8+(c-1)].charAt(0) == 'b') {
            if (r-1 == 0) validMoveBoard[(r-1)*8+(c-1)] = 'promotion';
            else validMoveBoard[(r-1)*8+(c-1)] = 'attack';
        } 
        if (c != 7 && board[(r-1)*8+(c+1)].charAt(0) == 'b') {
            if (r-1 == 0) validMoveBoard[(r-1)*8+(c+1)] = 'promotion';
            else validMoveBoard[(r-1)*8+(c+1)] = 'attack';
        } 
        setBoard(validMoveBoard);
        setPieceSeleted(Array<number>(r,c));
    }

    const handlePromotionClick = ({r,c,promote}:{r:number, c:number, promote:string}) => {
        console.log(promote);
        const nextBoard = oldBoard.slice();
        if (WhiteTurn) {
            nextBoard[r*8+c] = promote;
            nextBoard[pieceSelected[0]*8+pieceSelected[1]] = 'Blank';
        }
        else {
            nextBoard[r*8+c] = promote;
            nextBoard[pieceSelected[0]*8+pieceSelected[1]] = 'Blank';
        }
        setBoard(nextBoard);
        setOldBoard(nextBoard);
        setWhiteTurn(!WhiteTurn);

    }

    const promoteToQueen = ({r,c}: {r:number, c:number}) => {
        const promote = WhiteTurn ? "wQ" : "bQ";
        console.log(promote);
        handlePromotionClick({r,c,promote})
    }
    const promoteToRook = ({r,c}: {r:number, c:number}) => {
        const promote = WhiteTurn ? "wR" : "bR";
        handlePromotionClick({r,c,promote})
    }
    const promoteToBishop = ({r,c}: {r:number, c:number}) => {
        const promote = WhiteTurn ? "wB" : "bB";
        handlePromotionClick({r,c,promote})
    }
    const promoteToKnight = ({r,c}: {r:number, c:number}) => {
        const promote = WhiteTurn ? "wN" : "bN";
        handlePromotionClick({r,c,promote})
    }

    function diagonalMoves({r, c, validMoveBoard}:{r:number, c:number, validMoveBoard:Array<string>}) {
        let x = r, y = c;
        while (x+1 < 7 && y-1 >= 0) {
            if (board[(x+1)*8+(y-1)] == 'Blank') validMoveBoard[(x+1)*8+(y-1)] = 'valid';
            else if (board[(x+1)*8+(y-1)].charAt(0) == (WhiteTurn ? 'b' : 'w')) {
                validMoveBoard[(x+1)*8+(y-1)] = 'attack';
                break;
            }
            else break;
            x++, y--;
        }
        x = r, y = c;
        while (x+1 < 7 && y+1 < 7) {
            if (board[(x+1)*8+(y+1)] == 'Blank') validMoveBoard[(x+1)*8+(y+1)] = 'valid';
            else if (board[(x+1)*8+(y+1)].charAt(0) == (WhiteTurn ? 'b' : 'w')) {
                validMoveBoard[(x+1)*8+(y+1)] = 'attack';
                break;
            }
            else break;
            x++, y++;
        }
        x = r, y = c;
        while (x-1 >= 0 && y+1 < 7) {
            if (board[(x-1)*8+(y+1)] == 'Blank') validMoveBoard[(x-1)*8+(y+1)] = 'valid';
            else if (board[(x-1)*8+(y+1)].charAt(0) == (WhiteTurn ? 'b' : 'w')) {
                validMoveBoard[(x-1)*8+(y+1)] = 'attack';
                break;
            }
            else break;
            x--, y++;
        }
        x = r, y = c;
        while (x-1 >= 0 && y-1 >= 0) {
            if (board[(x-1)*8+(y-1)] == 'Blank') validMoveBoard[(x-1)*8+(y-1)] = 'valid';
            else if (board[(x-1)*8+(y-1)].charAt(0) == (WhiteTurn ? 'b' : 'w')) {
                validMoveBoard[(x-1)*8+(y-1)] = 'attack';
                break;
            }
            else break;
            x--, y--;
        }
    }

    function diagonalCheck({r, c, nextBoard}:{r:number, c:number, nextBoard:Array<string>}) {
        let x = r, y = c;
        while (x+1 < 7 && y-1 >= 0) {
            if (board[(x+1)*8+(y-1)] == 'Blank') x++, y--;
            else if (board[(x+1)*8+(y-1)].charAt(1) == 'K') {
                if (board[(x+1)*8+(y-1)] == (WhiteTurn ? 'bK' : 'wK')) {
                    nextBoard[(x+1)*8+(y-1)] = (WhiteTurn ? "checkbK" : "checkwK"), setInCheck(true);
                    break;
                }
            }
            else break;
        }
        x = r, y = c;
        while (x+1 < 7 && y+1 < 7) {
            if (board[(x+1)*8+(y+1)] == 'Blank') x++, y++;
            else if (board[(x+1)*8+(y+1)].charAt(1) == 'K') {
                if (board[(x+1)*8+(y+1)] == (WhiteTurn ? 'bK' : 'wK')) {
                    nextBoard[(x+1)*8+(y+1)] = (WhiteTurn ? "checkbK" : "checkwK"), setInCheck(true);
                    break;
                }
            }
            else break;
        }
        x = r, y = c;
        while (x-1 >= 0 && y+1 < 7) {
            if (board[(x-1)*8+(y+1)] == 'Blank') x--, y++;
            else if (board[(x-1)*8+(y+1)].charAt(1) == 'K') {
                if (board[(x-1)*8+(y+1)] == (WhiteTurn ? 'bK' : 'wK')) {
                    nextBoard[(x-1)*8+(y+1)] = (WhiteTurn ? "checkbK" : "checkwK"), setInCheck(true);
                    break;
                }
            }
            else break;
        }
        x = r, y = c;
        while (x-1 >= 0 && y-1 >= 0) {
            if (board[(x-1)*8+(y-1)] == 'Blank') x--, y--;
            else if (board[(x-1)*8+(y-1)].charAt(1) == 'K') {
                if (board[(x-1)*8+(y-1)] == (WhiteTurn ? 'bK' : 'wK')) {
                    nextBoard[(x-1)*8+(y-1)] = (WhiteTurn ? "checkbK" : "checkwK"), setInCheck(true);
                    break;
                }
            }
            else break;
        }
    }


    const buildBoard = () => {
        const boardRow = [];
        for (let r = 0; r < 8; r++) {
            const columns = [];
            for (let c = 0; c < 8; c++) {
                let i = r*8+c;
                switch (board[i]) {
                    case 'valid': columns.push(<Tile key={i} p={'Blank'} handleClick={() => {handleMovePiece({r,c})}} T='validMove'/>); break;
                    case 'attack': columns.push(<Tile key={i} p={oldBoard[i]} handleClick={() => {handleMovePiece({r,c})}} T='Attack'/>); break;
                    case 'promotion': columns.push(<PromotionTile key={i} WhiteTurn={WhiteTurn} handleClickQ={()=>{promoteToQueen({r,c})}} 
                        handleClickR={()=>{promoteToRook({r,c})}} handleClickB={()=>{promoteToBishop({r,c})}} handleClickN={()=>{promoteToKnight({r,c})}}/>); break;
                    case 'checkwK': columns.push(<Tile key={i} p={'wK'} handleClick={() => {handleClickOnPiece({r,c})}} T='Checked'/>); break;
                    case 'checkbK': columns.push(<Tile key={i} p={'bK'} handleClick={() => {handleClickOnPiece({r,c})}} T='Checked'/>); break;
                    default: 
                        columns.push(<Tile key={i} p={board[i]} handleClick={()=>{handleClickOnPiece({r,c})}} T='Piece'/>); break;
                }
            }
            boardRow.push(
                <div className="board-row">
                    {columns}
                </div>
            )
        }
        return (boardRow)
    }

    if (gameOver) alert("Checkmate");

    return (
        <>
            <div className="board">
                {buildBoard()}
            </div>
        </>
    )
}


const boardInit = () => {
    const board = Array<string>(64);
    for (let i = 16; i < 48; i++) board[i] = 'Blank';
    for (let i = 0; i < 8; i++) {
        board[8+i] = 'bP';
        board[48+i] = 'wP';
    }
    board[0] = 'bR';
    board[7] = 'bR';
    board[56] = 'wR';
    board[63] = 'wR';
    board[1] = 'bN';
    board[6] = 'bN';
    board[57] = 'wN';
    board[62] = 'wN';
    board[2] = 'bB';
    board[5] = 'bB';
    board[58] = 'wB';
    board[61] = 'wB';
    board[3] = 'bQ';
    board[4] = 'bK';
    board[59] = 'wQ';
    board[60] = 'wK';
    return board;
}

const Tile = ({p, handleClick, T}:{p:string, handleClick:any, T:string}) => {
    let piece = blank;
    switch (p) {
        case 'wP': piece = wP; break;
        case 'bP': piece = bP; break;
        case 'wR': piece = wR; break;
        case 'bR': piece = bR; break;
        case 'wN': piece = wN; break;
        case 'bN': piece = bN; break;
        case 'wB': piece = wB; break;
        case 'bB': piece = bB; break;
        case 'wQ': piece = wQ; break;
        case 'bQ': piece = bQ; break;
        case 'wK': piece = wK; break;
        case 'bK': piece = bK; break;
    }
    if (piece == blank && T != 'validMove') {
        return (
            <div className={"blankTile"}>
                <button>
                    <img src={piece.src} onClick={handleClick} width={100}/>
                </button>
            </div>
        )
    }
    return (
        <div className={T}>
            <button>
                <img src={piece.src} onClick={handleClick} width={100}/>
            </button>
        </div>
    )
}

const PromotionTile = ({WhiteTurn,handleClickQ,handleClickR,handleClickB,handleClickN }:{WhiteTurn:boolean,handleClickQ:any,handleClickR:any,handleClickB:any,handleClickN:any}) => {
    const pieces = WhiteTurn ? Array<StaticImageData>(wQ,wR,wB,wN) : Array<StaticImageData>(bQ,bR,bB,bN);

    return (
        <div className="PromotionTile">
            <div className="flex flex-row">
                <button className="PromotionButton">
                    <img src={pieces[0].src} onClick={handleClickQ}/>
                </button>
                <button className="PromotionButton">
                    <img src={pieces[1].src} onClick={handleClickR}/>
                </button>

            </div>
            <div className="flex flex-row">
                <button className="PromotionButton">
                    <img src={pieces[2].src} onClick={handleClickB}/>
                </button>
                <button className="PromotionButton">
                    <img src={pieces[3].src} onClick={handleClickN}/>
                </button>
            </div>
        </div>
    )
}