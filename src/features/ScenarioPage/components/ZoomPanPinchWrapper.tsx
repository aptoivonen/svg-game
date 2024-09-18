import { TransformWrapper } from 'react-zoom-pan-pinch'

type ZoomPanPinchWrapperProps = {
  initialPositionX: number
  initialPositionY: number
  children: React.ReactNode
}

const DEFAULTS = {
  LIMIT_TO_BOUNDS: false,
  MIN_SCALE: 0.5
}

function ZoomPanPinchWrapper({
  initialPositionX,
  initialPositionY,
  children
}: ZoomPanPinchWrapperProps) {
  return (
    <TransformWrapper
      initialPositionX={initialPositionX}
      initialPositionY={initialPositionY}
      limitToBounds={DEFAULTS.LIMIT_TO_BOUNDS}
      minScale={DEFAULTS.MIN_SCALE}
    >
      {children}
    </TransformWrapper>
  )
}

export default ZoomPanPinchWrapper
