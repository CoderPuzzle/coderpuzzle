# Prison Cells After N Days

## Description

Eight prison cells stand in a row, and each cell is either occupied or
vacant. Each day, every cell changes at once according to one rule:

- A cell whose two adjacent neighbors were both occupied or both vacant the
  previous day becomes occupied.
- Otherwise, it becomes vacant.

Because the prison is a row, the first and the last cells have only one
neighbor each, so after every change they are vacant.

You are given an integer array `cells`, where `cells[i]` is `1` if the `i`-th
cell is occupied and `0` if it is vacant, and you are given an integer `n`.
Return the state of the prison after `n` days, that is, after the rule above
has been applied `n` times.

### Example 1

```text
Input: cells = [0,1,0,1,1,0,0,1], n = 7
Output: [0,0,1,1,0,0,0,0]
Explanation: The state of the prison on each day:
Day 0: [0, 1, 0, 1, 1, 0, 0, 1]
Day 1: [0, 1, 1, 0, 0, 0, 0, 0]
Day 2: [0, 0, 0, 0, 1, 1, 1, 0]
Day 3: [0, 1, 1, 0, 0, 1, 0, 0]
Day 4: [0, 0, 0, 0, 0, 1, 0, 0]
Day 5: [0, 1, 1, 1, 0, 1, 0, 0]
Day 6: [0, 0, 1, 0, 1, 1, 0, 0]
Day 7: [0, 0, 1, 1, 0, 0, 0, 0]
```

### Example 2

```text
Input: cells = [1,0,0,1,0,0,1,0], n = 1000000000
Output: [0,0,1,1,1,1,1,0]
```

### Constraints

- `cells.length == 8`
- `cells[i]` is either `0` or `1`.
- `1 <= n <= 10⁹`
