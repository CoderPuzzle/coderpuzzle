# Matchsticks to Square

## Description

You are given an integer array `matchsticks` where `matchsticks[i]` is the
length of the `i`th matchstick. You want to use all the matchsticks to make
one square. You should not break any stick, but you can link them up, and each
matchstick must be used exactly one time.

Return `true` if you can make this square and `false` otherwise.

### Example 1

```text
Input: matchsticks = [1,1,2,2,2]
Output: true
Explanation: You can form a square with side length 2; one side of the square came from two sticks with length 1.
```

![A square of side 2 built from the five sticks; one side is the two length-1 sticks joined end to end](figures/example-1.svg)

### Example 2

```text
Input: matchsticks = [3,3,3,3,4]
Output: false
Explanation: You cannot find a way to form a square with all the matchsticks.
```

### Constraints

- `1 <= matchsticks.length <= 15`
- `1 <= matchsticks[i] <= 10^8`

## Hints

### Hint 1

Treat the matchsticks as an array to split into 4 parts of equal length; if the total is not divisible by 4, return false immediately.

### Hint 2

Every matchstick can belong to any of the 4 sides — try all options with recursion.

### Hint 3

You only need to track the current length of each of the 4 sides, not which sticks are on them.

### Hint 4

Sorting the matchsticks in descending order prunes the search quickly.
