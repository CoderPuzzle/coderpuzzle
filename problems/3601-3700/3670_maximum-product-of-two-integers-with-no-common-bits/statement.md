# Maximum Product of Two Integers With No Common Bits

## Description

You are given an integer array `nums`. Choose two distinct indices `i` and
`j` such that the binary representations of `nums[i]` and `nums[j]` share
no set bit — equivalently, `nums[i] & nums[j] == 0` — and the product
`nums[i] * nums[j]` is maximized. Return that largest possible product, or
`0` if no such pair of indices exists.

### Example 1

```text
Input: nums = [1,2,3,4,5,6,7]
Output: 12
Explanation: The best pair is 3 (`011` in binary) and 4 (`100`). They
share no set bit and 3 * 4 = 12. Every other disjoint pair multiplies to
less.
```

### Example 2

```text
Input: nums = [5,6,4]
Output: 0
Explanation: Written out in binary, each of 5 (`101`), 6 (`110`) and
4 (`100`) shares at least one set bit with both of the others, so no
qualifying pair exists and the answer is 0.
```

### Example 3

```text
Input: nums = [64,8,32]
Output: 2048
Explanation: The three values are distinct powers of two, so every pair
is disjoint. The answer is the product of the two largest, 64 * 32 =
2048.
```

### Constraints

- `2 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁶`

## Hints

### Hint 1

Every value below 10⁶ fits in 20 bits, so treat each `nums[i]` as a
bitmask; "no common set bits" is exactly `mask_i & mask_j == 0`.

### Hint 2

Build an array `dp` over all 2²⁰ masks, where `dp[mask]` starts as the
largest array value whose set bits are exactly `mask`, or 0 when no
element has that bitmask.

### Hint 3

Sweep one bit at a time so that afterwards `dp[mask]` holds the largest
array value whose set bits are a subset of `mask`: for every bit `b` and
every mask `m` containing it, relax `dp[m]` with `dp[m ^ (1 << b)]`.

### Hint 4

For a value `x` with mask `mx`, every disjoint partner's mask is a subset
of the complement `cm = FULL ^ mx`, where `FULL = 2²⁰ - 1`; the best such
partner is therefore `dp[cm]`.

### Hint 5

Scan the values once more tracking `x * dp[cm]`; when no disjoint partner
exists for any value every lookup yields 0, so the answer stays 0.
