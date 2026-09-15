# Champagne Tower

## Description

We stack glasses in a pyramid, where the first row has 1 glass, the second
row has 2 glasses, and so on until the 100th row. Each glass holds one cup
of champagne.

Then, some champagne is poured into the first glass at the top. When the
topmost glass is full, any excess liquid poured will fall equally to the
glass immediately to its left and right in the row below. When those
glasses become full, any excess champagne will fall equally to the left
and right of those glasses, and so on. (A glass in the bottom row has its
excess champagne fall on the floor.)

For example, after one cup of champagne is poured, the topmost glass is
full. After two cups of champagne are poured, the two glasses on the
second row are half full. After three cups of champagne are poured, those
two glasses are full, for 3 full glasses in total. After four cups of
champagne are poured, the third row has its middle glass half full and its
two outside glasses a quarter full.

![diagram](figures/799-1.svg)

Now after pouring a non-negative amount of champagne, return how full the
`j`-th glass in the `i`-th row is (both `i` and `j` are 0-indexed).

### Example 1

```text
Input: poured = 1, query_row = 1, query_glass = 1
Output: 0.00000
Explanation: We poured 1 cup of champagne into the top glass of the tower
(indexed (0, 0)). There is no excess liquid, so all the glasses under the
top glass remain empty.
```

### Example 2

```text
Input: poured = 2, query_row = 1, query_glass = 1
Output: 0.50000
Explanation: We poured 2 cups of champagne into the top glass of the tower
(indexed (0, 0)). There is one cup of excess liquid. The glasses indexed
(1, 0) and (1, 1) share the excess liquid equally, and each gets half a
cup of champagne.
```

### Example 3

```text
Input: poured = 100000009, query_row = 33, query_glass = 17
Output: 1.00000
```

### Constraints

- `0 <= poured <= 10⁹`
- `0 <= query_glass <= query_row < 100`
