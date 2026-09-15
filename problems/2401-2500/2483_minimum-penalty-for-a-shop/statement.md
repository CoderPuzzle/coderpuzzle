# Minimum Penalty for a Shop

## Description

You are given the customer visit log of a shop represented by a 0-indexed
string `customers` consisting only of characters `'N'` and `'Y'`:

- if the `i`th character is `'Y'`, it means that customers come at the `i`th
  hour, whereas `'N'` indicates that no customers come at the `i`th hour.

If the shop closes at the `j`th hour (`0 <= j <= n`), the penalty is
calculated as follows:

- For every hour when the shop is open and no customers come, the penalty
  increases by `1`.
- For every hour when the shop is closed and customers come, the penalty
  increases by `1`.

Return the earliest hour at which the shop must be closed to incur a minimum
penalty.

Note that if a shop closes at the `j`th hour, it means the shop is closed at
the hour `j`.

### Example 1

```text
Input: customers = "YYNY"
Output: 2
Explanation:
- Closing the shop at the 0th hour incurs 1+1+0+1 = 3 penalty.
- Closing the shop at the 1st hour incurs 0+1+0+1 = 2 penalty.
- Closing the shop at the 2nd hour incurs 0+0+0+1 = 1 penalty.
- Closing the shop at the 3rd hour incurs 0+0+1+1 = 2 penalty.
- Closing the shop at the 4th hour incurs 0+0+1+0 = 1 penalty.
Closing the shop at the 2nd or 4th hour gives a minimum penalty. Since 2 is
earlier, the optimal closing time is 2.
```

### Example 2

```text
Input: customers = "NNNNN"
Output: 0
Explanation: It is best to close the shop at the 0th hour as no customers arrive.
```

### Example 3

```text
Input: customers = "YYYY"
Output: 4
Explanation: It is best to close the shop at the 4th hour as customers arrive at each hour.
```

### Constraints

- `1 <= customers.length <= 10⁵`
- `customers` consists only of the characters `'Y'` and `'N'`.

## Hints

### Hint 1

At any closing hour j, the penalty is the count of 'N' in the prefix customers[:j] plus the count of 'Y' in the suffix customers[j:].

### Hint 2

Precompute or run-accumulate these counts so every candidate hour is evaluated in O(1), then take the earliest minimum.
