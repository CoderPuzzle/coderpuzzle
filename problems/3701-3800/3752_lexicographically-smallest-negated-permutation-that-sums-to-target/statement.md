# Lexicographically Smallest Negated Permutation that Sums to Target

## Description

You are given a positive integer `n` and an integer `target`.

Return the lexicographically smallest array of integers of size `n` such
that both of the following hold:

- The sum of its elements equals `target`.
- The absolute values of its elements form a permutation of size `n`.

If no such array exists, return an empty array.

A permutation of size `n` is a rearrangement of the integers `1, 2, ...,
n`, so each of these absolute values appears exactly once, with a freely
chosen sign.

An array `a` is lexicographically smaller than an array `b` of the same
length if, at the first position where they differ, `a` has an element
that is strictly less than the corresponding element of `b`. These rules
pin the answer down completely: valid arrays exist or they do not, and
when they do, exactly one of them is the smallest. Note that comparing
signed integers, `-3 < -2` and `-1 < 1`; in particular, negating an
element makes it smaller, which is why the answer tends to front-load its
negative values.

### Example 1

```text
Input: n = 3, target = 0
Output: [-3,1,2]
Explanation: The arrays whose elements sum to 0 and whose absolute values
form a permutation of size 3 are [-3,1,2], [-3,2,1], [-2,-1,3], [-2,3,-1],
[-1,-2,3], [-1,3,-2], [1,-3,2], [1,2,-3], [2,-3,1], [2,1,-3], [3,-2,-1]
and [3,-1,-2]. The lexicographically smallest one is [-3,1,2].
```

### Example 2

```text
Input: n = 4, target = 2
Output: [-4,1,2,3]
Explanation: The all-positive array sums to 10; reaching 2 requires
lowering the sum by 8, and negating 4 lowers it by exactly twice its
value. No valid array can contain an element below -4, so the smallest
answer begins with -4, and once -4 is placed the values 1, 2, 3 must all
stay positive for the total to come out as 2.
```

### Example 3

```text
Input: n = 1, target = 10000000000
Output: []
Explanation: The only permutation of size 1 is {1}, whose arrays are [1]
and [-1]; neither sums to 10000000000. Therefore, the answer is [].
```

### Constraints

- `1 <= n <= 10^5`
- `-10^10 <= target <= 10^10`

## Hints

### Hint 1

Start from the all-positive array `[1, 2, ..., n]` and let `S = n * (n +

1. / 2`. Any valid array's sum lies between `-S`and`S`.

### Hint 2

Negating a value `x` lowers the sum by `2 * x`, so every reachable target
has the same parity as `S`. If `target` is outside `[-S, S]` or `S -
target` is odd, no valid array exists — return the empty array.

### Hint 3

Let `D = (S - target) / 2`. You must negate a subset of `{1, ..., n}`
whose values sum to exactly `D`, and any such subset works.

### Hint 4

To make the array lexicographically smallest, negate the largest values
possible: scan `x = n` down to `1` and negate `x` whenever `x` still fits
in the remaining deficit.

### Hint 5

Emitting the negated values in descending order followed by the kept
positive values in ascending order gives the lexicographically smallest
arrangement directly.
