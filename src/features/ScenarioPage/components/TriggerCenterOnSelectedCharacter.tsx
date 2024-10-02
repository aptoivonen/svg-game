import { TILE_CSS_SIZE } from '@/features/ScenarioPage/constants'
import { useCharacter, useMode } from '@/store'
import { useEffect, useState } from 'react'
import { useControls } from 'react-zoom-pan-pinch'

export default function TriggerCenterOnSelectedCharacter() {
  const {
    instance: {
      transformState: { scale }
    },
    setTransform
  } = useControls()
  const mode = useMode()
  const character = useCharacter(
    mode.name === 'selectedCharacter' ? mode.characterId : ''
  )

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

  useEffect(() => {
    const isCenterViewOnSelectedCharacter =
      mode.name === 'selectedCharacter' && mode.isStartOfTurn
    if (isCenterViewOnSelectedCharacter) {
      const [characterPositionX, characterPositionY] = character?.position || [
        0, 0
      ]
      const viewX = Math.floor(
        dimensions.width / 2 - TILE_CSS_SIZE * characterPositionX * scale
      )
      const viewY = Math.floor(
        dimensions.height / 2 - TILE_CSS_SIZE * characterPositionY * scale
      )
      setTransform(viewX, viewY, scale)
    }
  }, [mode, scale, character, dimensions, setTransform])

  return null
}
