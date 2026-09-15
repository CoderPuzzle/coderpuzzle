# Put Boxes Into the Warehouse I

## Description

You are given two arrays of positive integers, `boxes` and `warehouse`,
representing the heights of some boxes of unit width and the heights of
`n` rooms in a warehouse. The warehouse's rooms are labeled `0` to
`n - 1` from left to right, where `warehouse[i]` (0-indexed) is the
height of the `i`th room.

Boxes are put into the warehouse under the following rules:

- Boxes cannot be stacked.
- You may rearrange the insertion order of the boxes.
- Boxes can only be pushed into the warehouse from left to right.
- If the height of some room in the warehouse is less than the height of
  a box, then that box, and every other box still behind it in the push,
  is stopped before that room — it and the boxes behind it can never
  reach a room past that point, no matter how tall that later room is.

Return the maximum number of boxes you can put into the warehouse.

### Example 1

![diagram](figures/1564-1.svg)

![diagram](figures/1564-2.svg)

```text
Input: boxes = [4,3,4,1], warehouse = [5,3,3,4,1]
Output: 3
Explanation: Put the box of height 1 in room 4. Put a box of height 3 in
any of rooms 1, 2, or 3. Put a box of height 4 in room 0. There is no way
to fit all 4 boxes in the warehouse.
```

### Example 2

![diagram](figures/1564-3.svg)

![diagram](figures/1564-4.svg)

```text
Input: boxes = [1,2,2,3,4], warehouse = [3,4,1,2]
Output: 3
Explanation: The box of height 4 can never enter, since it cannot pass
the first room of height 3. Of the last two rooms, heights 1 and 2, only
boxes of height 1 fit. At most 3 boxes fit in total.
```

### Example 3

```text
Input: boxes = [1,2,3], warehouse = [1,2,3,4]
Output: 1
Explanation: The first room has height 1, so every box that enters the
warehouse must pass through it first — only a box of height 1 can.
```

### Constraints

- `n == warehouse.length`
- `1 <= boxes.length, warehouse.length <= 10⁵`
- `1 <= boxes[i], warehouse[i] <= 10⁹`

## Hints

### Hint 1

Sort the boxes in ascending order, and try to process the box with the
smallest height first.
