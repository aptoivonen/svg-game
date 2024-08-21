type BackgroundProps = {
  viewBoxWidth: number
  viewBoxHeight: number
}

function Background({ viewBoxWidth, viewBoxHeight }: BackgroundProps) {
  return <rect width={viewBoxWidth} height={viewBoxHeight} fill="#ccc"></rect>
}

export default Background
