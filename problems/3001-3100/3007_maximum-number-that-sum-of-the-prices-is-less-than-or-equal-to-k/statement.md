# Maximum Number That Sum of the Prices Is Less Than or Equal to K

## Description

You are given an integer `k` and an integer `x`.

The price of a number `num` is calculated by the count of set bits at positions `x`, `2x`, `3x`, etc., in its binary representation, starting from the least significant bit. For example, with `x = 1` the price of `13` is `3` (binary `1101` has 3 set bits), and with `x = 2` the price of `13` is `1` (only bit position 2 is set).

The accumulated price of `num` is the total price of numbers from `1` to `num`. `num` is considered cheap if its accumulated price is less than or equal to `k`.

Return the greatest cheap number.

### Example 1

```text
Input: k = 9, x = 1
Output: 6
Explanation: As shown in the table below, 6 is the greatest cheap number.
Prices with x = 1: 1->1, 2->1, 3->2, 4->1, 5->2, 6->2, 7->3.
Accumulated prices: 1, 2, 4, 5, 7, 9, 12.
6 is the greatest number whose accumulated price is <= 9.
```

### Example 2

```text
Input: k = 7, x = 2
Output: 9
Explanation: As shown in the table below, 9 is the greatest cheap number.
Prices with x = 2: 1->0, 2->1, 3->1, 4->0, 5->0, 6->1, 7->1, 8->1, 9->1, 10->2.
Accumulated prices: 0, 1, 2, 2, 2, 3, 4, 5, 6, 8.
9 is the greatest number whose accumulated price is <= 7.
```

### Constraints

- `1 <= k <= 10^15`
- `1 <= x <= 8`

## Hints

### Hint 1

Binary search the answer.

### Hint 2

In each step of the binary search, count how many numbers in [1, n] have a set bit at each position x, 2x, 3x, ... and sum those counts to get the accumulated price of n.
