import Link from "next/link";
import homeBG from "./game-component/images/background.jpg"

export default function Home() {
  return (
    <body style={{  backgroundImage: `url(${homeBG.src})`, 
                    backgroundPosition: 'bottom',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100%'
    }}>
    <main className="flex min-h-screen flex-col place-content-center items-center p-24">
        <div className="box-border h-32">
            <h1 className="text-8xl">
                Chess Project
            </h1>

        </div>
        <Link
          href="./game/pass-and-play"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Play-and-Play
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Play on same device
          </p>
        </Link>

        <a
          href=""
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Multiplayer
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
            Play on multiple devices
          </p>
        </a>
    </main>
    </body>
  )
}
