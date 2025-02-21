import Link from "next/link"
import { JSX } from "react"

interface ContactInfoProps {
  mainclass: string
  linkclass: string
  teldata: string
  emaildata: string
  telicon: JSX.Element
  emailicon: JSX.Element
  addressicon: JSX.Element
}

export const ContactInfo = ({ mainclass, linkclass, teldata, emaildata, telicon, emailicon }: ContactInfoProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-bold text-zinc-900">Informações de contato</h2>
      <div className={mainclass}>
      <Link className={linkclass}
          aria-label="Phone Number"
          href={`tel:${teldata}`}>
          {telicon}  {teldata}
        </Link>
        <a className={linkclass}
          aria-label="Email Address"
          href={`mailto:${emaildata}`}>
          {emailicon} {emaildata}
        </a>
      </div>
    </div>
  )
}