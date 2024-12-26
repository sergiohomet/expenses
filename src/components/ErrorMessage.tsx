import { ReactNode } from "react"

type ErrorMessageProps = {
  children: ReactNode
}

export default function ErrorMessage({children}: ErrorMessageProps) {
  return (
    <p className="bg-red-600 p-2 uppercase font-bold text-center text-white">
      {children}
    </p>
  )
}
