import clsx from 'clsx'
import { GiReturnArrow } from 'react-icons/gi'

type EndOfTurnButtonProps = {
  onClick: () => void
  isPlayerTurn: boolean
  className?: React.ComponentProps<'button'>['className']
}

export default function EndOfTurnButton({
  onClick,
  isPlayerTurn,
  className
}: EndOfTurnButtonProps) {
  return (
    <button
      className={clsx(
        className,
        'size-20 rounded-full border-2 border-slate-500',
        isPlayerTurn
          ? 'bg-green-600 hover:bg-green-300 active:bg-green-50'
          : 'animate-spin-slow bg-orange-600'
      )}
      onClick={onClick}
      disabled={!isPlayerTurn}
      type="button"
    >
      <div className="grid h-full place-items-center">
        <span className="sr-only">End Turn</span>
        <GiReturnArrow className="size-12" />
      </div>
    </button>
  )
}
