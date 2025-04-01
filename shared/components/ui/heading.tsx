import clsx from 'clsx'
import React, { FC, ReactNode } from 'react'

interface Props {
  level: 1 | 2 | 3
  children: ReactNode
  className?: string
}

export const Heading: FC<Props> = ({ level, children, className }) => {
  const renderingElement = () => {
    switch (level) {
      case 1:
        return <h1 className={clsx(className, 'font-bold md:text-5xl sm:text-4xl xs:text-3xl')}>{children}</h1>
      case 2:
        return <h2 className={clsx(className, 'font-bold md:text-4xl sm:text-3xl xs:text-2xl')}>{children}</h2>
      case 3:
        return <h3 className={clsx(className, 'font-bold text-3xl')}>{children}</h3>
    }
  }

  return <React.Fragment>{renderingElement()}</React.Fragment>
}
