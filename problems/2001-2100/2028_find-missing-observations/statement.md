# Find Missing Observations

## Description

You have observations of `n + m` 6-sided dice rolls with each face numbered
from 1 to 6. `n` of the observations went missing, and you only have the
observations of `m` rolls. Fortunately, you have also calculated the average
value of the `n + m` rolls.

You are given an integer array `rolls` of length `m`, where `rolls[i]` is the
value of the ith observation. You are also given the two integers `mean` and
`n`.

Return an array of length `n` containing the missing observations such that the
average value of the `n + m` rolls is exactly `mean`. If no such array exists,
return an empty array. Although multiple valid arrays may exist, use the
following rule for deterministic judging: distribute the required missing sum
as evenly as possible and return the larger values first. More precisely, if
`base` is the required missing sum divided by `n`, rounded down, the first
`required missing sum mod n` positions must contain `base + 1` and all
remaining positions must contain `base`.

The average value of a set of `k` numbers is the sum of the numbers divided by
`k`.

Note that `mean` is an integer, so the sum of the `n + m` rolls should be
divisible by `n + m`.

### Example 1

```text
Input: rolls = [3,2,4,3], mean = 4, n = 2
Output: [6,6]
Explanation: The mean of all n + m rolls is (3 + 2 + 4 + 3 + 6 + 6) / 6 = 4.
```

### Example 2

```text
Input: rolls = [1,5,6], mean = 3, n = 4
Output: [3,2,2,2]
Explanation: The mean of all n + m rolls is (1 + 5 + 6 + 3 + 2 + 2 + 2) / 7 = 3.
```

### Example 3

```text
Input: rolls = [1,2,3,4], mean = 6, n = 4
Output: []
Explanation: It is impossible for the mean to be 6 no matter what the 4 missing rolls are.
```

### Constraints

- `m == rolls.length`
- `1 <= n, m <= 10⁵`
- `1 <= rolls[i], mean <= 6`

## Hints

### Hint 1

What should the sum of the `n` rolls be?

### Hint 2

Could you generate an array of size `n` such that each element is between 1 and 6?
