# Solutions — Execution of All Suffix Instructions Staying in a Grid

## Simulate every suffix

For each starting instruction, reset the robot to `startPos` and follow that suffix one character at a time. Translate each instruction into its row or column change, then stop before counting the first move whose destination lies outside the grid.

Every successfully entered cell contributes one to that suffix's answer. With at most 500 instructions, directly examining every suffix is comfortably bounded and avoids any shared state between starts.

**Complexity:** `O(m²)` time and `O(1)` auxiliary space besides the `O(m)` returned array.
