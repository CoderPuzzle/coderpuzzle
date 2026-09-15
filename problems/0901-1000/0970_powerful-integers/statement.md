# Powerful Integers

## Description

Given three integers `x`, `y`, and `bound`, return a list of all the powerful
integers that have a value less than or equal to `bound`.

An integer is powerful if it can be represented as `x^i + y^j` for some
integers `i >= 0` and `j >= 0`. Because `i` and `j` may both be `0`, and
`x^0 = y^0 = 1`, every power family contains `1` — the smallest powerful
integer is `1 + 1 = 2`, and no smaller value can ever qualify.

The original exercise accepts the answer in any order; this judge compares
arrays exactly, so pin one deterministic form: return the values in ascending
order, each occurring at most once — the two outputs below already follow it.

### Example 1

```text
Input: x = 2, y = 3, bound = 10
Output: [2,3,4,5,7,9,10]
Explanation: 2 = 2^0 + 3^0
3 = 2^1 + 3^0
4 = 2^0 + 3^1
5 = 2^1 + 3^1
7 = 2^2 + 3^1
9 = 2^3 + 3^0
10 = 2^0 + 3^2
```

### Example 2

```text
Input: x = 3, y = 5, bound = 15
Output: [2,4,6,8,10,14]
```

### Constraints

- `1 <= x, y <= 100`
- `0 <= bound <= 10⁶`
