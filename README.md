# SVG Game (title in progress)

The SVG Game is a tactical battle game using mostly React and SVG technologies.
The player and ai have characters on the map. The player gives orders his characters, which include moving around the map, fighting and casting spells. The game ends, when all ai enemies are killed.

# Battle System

Each character has 3 actions each turn, 2 of which can used for moving. The player and ai alternate taking turns.

The map tiles affect movement, costing 1 or 2 points to enter, or they block movement altogether. All the map is visible (change this later).

# Technical Details

This section gives details about the code.

## Map

The map uses SVG Use elements to draw tiles from the tileset.png. The tiles are organizes in 3 layers: terrain tiles, terrain edge tiles, and terrain feature tiles. The game fetches the edge tiles based on the terrain type tiles position in the tileset image.

The map is derived from a json file that also has the other scenario elements, e.g. characters.

## Pathfinding

The A\* algorithm finds path on the map based on the map movement costs, other characters, obstacles, and if the character has actions points left.

## Modes

Each store action requires the right mode to be activated and may move the game to another mode.

The modes are:

- Viewing
- Selected Character
- Executing
- Targeting
- Ai turn

### Viewing

Just viewing the battlefield on player turn, no character selected. Select a character to move to 'Selected Character' mode. End turn to move to 'Ai turn' mode.

### Selected Character

The game shows a path for the selected character, if there are move actions left. Click a tile to move to it, moving to 'Executing' mode. Press 'Esc' to move to 'Viewing' mode. Select another character to move to another 'Selected Character' mode state.

### Targeting

Not implemented yet.

### Executing

A selected character is moving, disabling controls. The mode remembers which character was selected, when it returns to 'Selected Character' mode.

### Ai turn

The Ai does its turn, controls are disabled. Returns to 'Selected Character' mode after finished.
