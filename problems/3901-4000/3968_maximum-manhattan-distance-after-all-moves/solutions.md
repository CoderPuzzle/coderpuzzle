# Solutions — Maximum Manhattan Distance After All Moves

## Net movement plus wildcards

Combine opposite moves: `x = count('R') - count('L')` and
`y = count('U') - count('D')`. Each wildcard can be assigned to the axis that
already contributes more to the absolute distance, increasing the final
Manhattan distance by exactly one.

The answer is therefore `abs(x) + abs(y) + count('_')`.

**Complexity:** `O(n)` time, `O(1)` space.
