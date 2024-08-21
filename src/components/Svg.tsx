type SvgProps = {
  viewBoxWidth: number
  viewBoxHeight: number
  outerWidth: number
  children: React.ReactNode
}

function Svg({ viewBoxWidth, viewBoxHeight, outerWidth, children }: SvgProps) {
  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      width={`${outerWidth}px`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  )
}

export default Svg
