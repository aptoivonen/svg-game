import { TransformWrapper } from 'react-zoom-pan-pinch'

type ZoomPanPinchWrapperProps = {
  initialPositionX: number
  initialPositionY: number
  children: React.ReactNode
}

const DEFAULTS = {
  LIMIT_TO_BOUNDS: false,
  MAX_SCALE: 2,
  MIN_SCALE: 0.5,
  SMOOTH_SCROLL: false,
  ZOOM_STEP: 0.5,
  DBL_CLICK_ZOOM_DISABLED: true,
  PANNING_VELOCITY_DISABLED: true
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
      maxScale={DEFAULTS.MAX_SCALE}
      minScale={DEFAULTS.MIN_SCALE}
      smooth={DEFAULTS.SMOOTH_SCROLL}
      wheel={{ step: DEFAULTS.ZOOM_STEP }}
      doubleClick={{ disabled: DEFAULTS.DBL_CLICK_ZOOM_DISABLED }}
      panning={{ velocityDisabled: DEFAULTS.PANNING_VELOCITY_DISABLED }}
    >
      {children}
    </TransformWrapper>
  )
}

export default ZoomPanPinchWrapper
