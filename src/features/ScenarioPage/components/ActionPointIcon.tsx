import type { ComponentPropsWithoutRef } from 'react'

type ActionPointIconProps = unknown & ComponentPropsWithoutRef<'svg'>
export default function ActionPointIcon({
  x,
  y,
  width,
  height
}: ActionPointIconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      x={x}
      y={y}
      width={width}
      height={height}
    >
      <defs>
        <radialGradient id="blueWhiteGradient">
          <stop offset="20%" stopColor="rgb(224 242 254)" />
          <stop offset="100%" stopColor="rgb(56 189 248)" />
        </radialGradient>
      </defs>
      <circle cx="10" cy="10" r="10" fill="url('#blueWhiteGradient')"></circle>
      <circle
        cx="10"
        cy="10"
        r="9"
        fill="none"
        stroke="black"
        strokeWidth="2"
      ></circle>
    </svg>
  )
}
