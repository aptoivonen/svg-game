import { Character, PathSegment } from '@/types'

export default function pathToIdPath(
  character: Character
): Array<PathSegment & { id: string }> {
  return character.path
    ? character.path.map((pathSegment) => ({
        ...pathSegment,
        id: `${character.id}-${pathSegment.position[0]}-${pathSegment.position[1]}`
      }))
    : []
}
