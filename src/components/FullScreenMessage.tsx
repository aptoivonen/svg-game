type FullScreenMessageProps = {
  children: React.ReactNode
}

export default function FullScreenMessage({
  children
}: FullScreenMessageProps) {
  return (
    <div className="grid h-full place-items-center text-xl text-white">
      <div className="max-w-xl">{children}</div>
    </div>
  )
}
