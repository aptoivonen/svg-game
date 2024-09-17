import { Character, Path, PathSegment } from '@/types'

export function characterPathToIdPath(
  character: Character
): Array<PathSegment & { id: string }> {
  return character.path ? pathToIdPath(character.id, character.path) : []
}

export function pathToIdPath(
  characterId: string,
  path: Path
): Array<PathSegment & { id: string }> {
  return path.map((pathSegment) => ({
    ...pathSegment,
    id: `${characterId}-${pathSegment.position[0]}-${pathSegment.position[1]}`
  }))
}
