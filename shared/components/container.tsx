import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
  return <div className={clsx(className, 'max-w-[1300px] px-4 mx-auto')}>{children}</div>
}
