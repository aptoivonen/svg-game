import { TILE_CSS } from '@/config'
import { usePlayerCharactersList } from '@/store'
import { Position } from '@/types'
import { useEffect, useState } from 'react'

const tileCssSize: [number, number] = [TILE_CSS.WIDTH, TILE_CSS.HEIGHT]

/** Uses one player character's position as initial position, (0,0) otherwise. */
export default function useInitialPosition(): Position {
  const playerCharactersList = usePlayerCharactersList()

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const getDimensions = () => ({
      width: window.innerWidth,
      height: window.innerHeight
    })

    const handleResize = () => {
      setDimensions(getDimensions())
    }

    setDimensions(getDimensions())

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (playerCharactersList.length === 0) {
    return [0, 0] as const
  }
  return [
    -playerCharactersList[0].position[0] * tileCssSize[0] +
      dimensions.width / 2,
    -playerCharactersList[0].position[1] * tileCssSize[1] +
      dimensions.height / 2
  ]
}
