import Link from "next/link";
import { Board } from '../../game-component/components/Board';
import chessBoard from '../../game-component/images/board-background.jpg'

export default function passNplay() {
    
    return (
        <body style={{  backgroundImage: `url(${chessBoard.src})`, 
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '40%',
        }}>

            <main className="flex min-h-screen place-content-center items-center">
                <div className="flex flex-col pt-2.5">
                    <div className="pt-8"></div>
                    <div className="flex flex-row">
                        <div className="flex flex-col pr-4">
                            <div className="NumberLabel">8</div>
                            <div className="NumberLabel">7</div>
                            <div className="NumberLabel">6</div>
                            <div className="NumberLabel">5</div>
                            <div className="NumberLabel">4</div>
                            <div className="NumberLabel">3</div>
                            <div className="NumberLabel">2</div>
                            <div className="NumberLabel">1</div>
                        </div>
                        <Board />
                        <div className="pr-8"></div> 
                    </div>
                    <div className="flex flex-row text-2xl pt-2.5">
                            <div className="pl-8"></div>
                            <div className="RankLabel">A</div>
                            <div className="RankLabel">B</div>
                            <div className="RankLabel">C</div>
                            <div className="RankLabel">D</div>
                            <div className="RankLabel">E</div>
                            <div className="RankLabel">F</div>
                            <div className="RankLabel">G</div>
                            <div className="RankLabel">H</div>
                    </div>
                </div>
            </main>
        </body>
    )  
}

