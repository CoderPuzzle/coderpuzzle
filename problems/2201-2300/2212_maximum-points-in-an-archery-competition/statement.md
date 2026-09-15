# Maximum Points in an Archery Competition

## Description

Alice and Bob are opponents in an archery competition. The competition has set
the following rules:

- Alice first shoots `numArrows` arrows and then Bob shoots `numArrows` arrows.
- The points are then calculated as follows:
    - The target has integer scoring sections ranging from `0` to `11` inclusive.
    - For each section of the target with score `k` (in between `0` to `11`),
      say Alice and Bob have shot `ak` and `bk` arrows on that section
      respectively. If `ak >= bk`, then Alice takes `k` points. If `ak < bk`,
      then Bob takes `k` points.
    - However, if `ak == bk == 0`, then nobody takes `k` points.

For example, if Alice and Bob both shot 2 arrows on the section with score 11,
then Alice takes 11 points. On the other hand, if Alice shot 0 arrows on the
section with score 11 and Bob shot 2 arrows on that same section, then Bob
takes 11 points.

You are given the integer `numArrows` and an integer array `aliceArrows` of
size 12, which represents the number of arrows Alice shot on each scoring
section from 0 to 11. Now, Bob wants to maximize the total number of points he
can obtain.

Return the array `bobArrows` which represents the number of arrows Bob shot on
each scoring section from 0 to 11. The sum of the values in `bobArrows` should
equal `numArrows`.

If there are multiple ways for Bob to earn the maximum total points, return
any one of them. For deterministic judging, spend `aliceArrows[k] + 1` arrows
on every section `k` you win, put all remaining arrows on section `0`, and,
among equally scoring choices, win the set of sections whose bitmask
`Σ 2ᵏ` is smallest.

### Example 1

![diagram](figures/2212-1.svg)

```text
Input: numArrows = 9, aliceArrows = [1,1,0,1,0,0,2,1,0,1,2,0]
Output: [0,0,0,0,1,1,0,0,1,2,3,1]
Explanation: Bob earns a total point of 4 + 5 + 8 + 9 + 10 + 11 = 47.
It can be shown that Bob cannot obtain a score higher than 47 points.
```

### Example 2

![diagram](figures/2212-2.svg)

```text
Input: numArrows = 3, aliceArrows = [0,0,1,0,0,0,0,0,0,0,0,2]
Output: [0,0,0,0,0,0,0,0,1,1,1,0]
Explanation: Bob earns a total point of 8 + 9 + 10 = 27.
It can be shown that Bob cannot obtain a score higher than 27 points.
```

### Constraints

- `1 <= numArrows <= 10⁵`
- `aliceArrows.length == bobArrows.length == 12`
- `0 <= aliceArrows[i], bobArrows[i] <= numArrows`
- `sum(aliceArrows[i]) == numArrows`

## Hints

### Hint 1

To obtain points for some certain section x, what is the minimum number of
arrows Bob must shoot?

### Hint 2

Given the small number of sections, can we brute force which sections Bob
wants to win?

### Hint 3

For every set of sections Bob wants to win, check if we have the required
amount of arrows. If we do, it is a valid selection.
