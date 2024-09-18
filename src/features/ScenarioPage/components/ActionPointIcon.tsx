import clsx from 'clsx'

type ActionPointIconProps = {
  active: boolean
}

export default function ActionPointIcon({ active }: ActionPointIconProps) {
  return (
    <div
      className={clsx(
        'aspect-[1] rounded-full',
        active ? 'bg-slate-200' : 'border border-slate-200 bg-slate-900'
      )}
    />
  )
}
