# Minimize Rounding Error to Meet Target

## Description

Given an array of prices [p1,p2...,pn] and a target, round each price pi
to Roundi(pi) so that the rounded array [Round1(p1),Round2(p2)...,Roundn(pn)]
sums to the given target. Each operation Roundi(pi) could be either
Floor(pi) or Ceil(pi).

Return the string "-1" if the rounded array is impossible to sum to
target. Otherwise, return the smallest rounding error, which is defined
as Σ |Roundi(pi) - (pi)| for i from 1 to n, as a string with three places
after the decimal.

### Example 1

```text
Input: prices = ["0.700","2.800","4.900"], target = 8
Output: "1.000"
Explanation:
Use Floor, Ceil and Ceil operations to get (0.7 - 0) + (3 - 2.8) + (5 - 4.9) = 0.7 + 0.2 + 0.1 = 1.0 .
```

### Example 2

```text
Input: prices = ["1.500","2.500","3.500"], target = 10
Output: "-1"
Explanation: It is impossible to meet the target.
```

### Example 3

```text
Input: prices = ["1.500","2.500","3.500"], target = 9
Output: "1.500"
```

### Constraints

- `1 <= prices.length <= 500`
- Each string prices[i] represents a real number in the range
  `[0.0, 1000.0]` and has exactly 3 decimal places.
- `0 <= target <= 10^6`

## Hints

### Hint 1

If we have integer values in the array then we just need to subtract the
target those integer values, so we reduced the problem.

### Hint 2

Similarly if we have non integer values we have two options to put them
flor(value) or ceil(value) = floor(value) + 1, so the idea is to just
subtract floor(value).

### Hint 3

Now the problem is different for each position we can sum just add 0 or 1
in order to sum the target, minimizing the deltas. This can be solved
with DP.
