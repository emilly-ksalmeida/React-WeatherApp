import type { ReactNode } from "react"

type Props = {
    children: ReactNode
}

export default function Card( { children } : Props) {

    return(
        <div className="bg-amber-400 w-96 h-96 text-black">
          {children}
        </div>
    )
}
