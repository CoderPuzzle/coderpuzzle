# Total Waviness of Numbers in Range II

## Description

You are given two integers `num1` and `num2` that describe the inclusive range
`[num1, num2]`.

The **waviness** of a single number counts its peaks and valleys among its
decimal digits:

- An interior digit (one with a digit on both sides) is a _peak_ if it is
  strictly greater than both of its immediate neighbors.
- It is a _valley_ if it is strictly less than both of its immediate
  neighbors.
- A comparison against an equal neighbor never makes a digit a peak or a
  valley, and the first and last digits can never be either.

Every number with fewer than three digits therefore has a waviness of 0. For
example, 4848 has waviness 2: the second digit 8 is strictly greater than both
4s around it (a peak), and the third digit 4 is strictly less than both 8s
around it (a valley), while 1111 has waviness 0 because no digit differs from
its neighbors.

Return the total sum of the waviness of every number in `[num1, num2]`.

### Example 1

```text
Input: num1 = 120, num2 = 130
Output: 3
Explanation:
In [120, 130]:
- 120: the middle digit 2 is a peak, waviness = 1.
- 121: the middle digit 2 is a peak, waviness = 1.
- 130: the middle digit 3 is a peak, waviness = 1.
- Every other number in the range has waviness 0.
So the total waviness is 1 + 1 + 1 = 3.
```

### Example 2

```text
Input: num1 = 198, num2 = 202
Output: 3
Explanation:
In [198, 202]:
- 198: the middle digit 9 is a peak, waviness = 1.
- 201: the middle digit 0 is a valley, waviness = 1.
- 202: the middle digit 0 is a valley, waviness = 1.
- Every other number in the range has waviness 0.
So the total waviness is 1 + 1 + 1 = 3.
```

### Example 3

```text
Input: num1 = 4848, num2 = 4848
Output: 2
Explanation:
4848 has one peak (the second digit 8) and one valley (the third digit 4),
so its waviness is 2 and the total over the range is also 2.
```

### Constraints

- `1 <= num1 <= num2 <= 10¹⁵`
- The answer fits in a signed 64-bit integer.

## Hints

### Hint 1

Enumerating every number in the range cannot work — there can be almost `10¹⁵`
of them. Instead compute a prefix total `f(N)` — the waviness of all numbers
in `[1, N]` — and combine two of those.

### Hint 2

Build the digits of `N` from the most significant end and sweep left to right,
tracking whether the prefix built so far still equals N's prefix and what the
last two placed digits are. A peak or valley becomes known exactly when its
right neighbor is placed.

### Hint 3

Treat leading zeros carefully: they are not digits of the number, so keep a
"started" flag and only score turns among genuinely placed digits.
