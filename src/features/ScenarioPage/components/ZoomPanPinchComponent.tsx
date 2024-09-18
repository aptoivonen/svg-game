import { TransformComponent } from 'react-zoom-pan-pinch'

type ZoomPanPinchComponentProps = {
  children: React.ReactNode
}

function ZoomPanPinchComponent({ children }: ZoomPanPinchComponentProps) {
  return (
    <TransformComponent wrapperStyle={{ height: '100%', width: '100%' }}>
      {children}
    </TransformComponent>
  )
}

export default ZoomPanPinchComponent
