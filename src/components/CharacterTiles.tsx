import { memo } from 'react'
import { useTileSize } from '@/components/App'

type CharactersProps = {
  useId: string
  children: React.ReactNode
}

function Characters({ useId, children }: CharactersProps) {
  const [tileWidth, tileHeight] = useTileSize()

  return (
    <g id="characters">
      <symbol
        width={tileWidth}
        height={tileHeight}
        id={useId}
        viewBox="0 0 20 20"
      >
        <rect width={16} height={16} x={2} y={2}></rect>
        <path
          transform="translate(2 2)"
          d="M6 6.207v9.043a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H6.236a1 1 0 0 1-.447-.106l-.33-.165A.83.83 0 0 1 5 2.488V.75a.75.75 0 0 0-1.5 0v2.083c0 .715.404 1.37 1.044 1.689L5.5 5c.32.32.5.754.5 1.207"
          className="fill-black"
        />
        <path
          transform="translate(2 2)"
          d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"
          className="fill-black"
        />
      </symbol>
      {children}
    </g>
  )
}

export default memo(Characters)
