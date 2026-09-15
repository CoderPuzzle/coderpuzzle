# Sum of Beautiful Subsequences

## Description

You are given an integer array `nums` of length `n`.

For every positive integer `g`, define the beauty of `g` as the product of
`g` and the number of strictly increasing subsequences of `nums` whose
greatest common divisor (GCD) is exactly `g`.

Return the sum of beauty values over all positive integers `g`. Since the
answer can be huge, return it modulo `10⁹ + 7`.

### Example 1

```text
Input: nums = [1,2,3]
Output: 10
Explanation: The strictly increasing subsequences of [1,2,3] and their
GCDs are [1] -> 1, [2] -> 2, [3] -> 3, [1,2] -> 1, [1,3] -> 1,
[2,3] -> 1 and [1,2,3] -> 1. Five subsequences have GCD 1, giving a
beauty of 1 * 5 = 5; one has GCD 2, giving 2 * 1 = 2; one has GCD 3,
giving 3 * 1 = 3. The total beauty is 5 + 2 + 3 = 10.
```

### Example 2

```text
Input: nums = [4,6]
Output: 12
Explanation: The strictly increasing subsequences are [4] with GCD 4,
[6] with GCD 6 and [4,6] with GCD 2. The beauty values are 4, 6 and
2 * 1 = 2, and their sum is 12.
```

### Constraints

- `1 <= n == nums.length <= 10⁴`
- `1 <= nums[i] <= 7 * 10⁴`

## Hints

### Hint 1

For a candidate GCD `g`, keep only the elements divisible by `g`, in their
original order, and divide each of them by `g`. Every strictly increasing
subsequence of this scaled list corresponds to a subsequence of `nums`
whose elements are all multiples of `g`.

### Hint 2

Count the strictly increasing subsequences of that scaled list by
compressing its values into ranks and walking it left to right: each
element contributes `1 +` (the sum of the counts already accumulated for
strictly smaller ranks), which is a prefix-sum query a Fenwick tree can
answer.

### Hint 3

The count you obtain counts subsequences whose GCD is any multiple of `g`,
because elements all divisible by `g` only guarantee a GCD divisible by
`g`; it therefore overcounts "exactly `g`".

### Hint 4

Sweep `g` from `max(nums)` down to `1` and subtract what the multiples
have already claimed: `F[g] = cnt[g] - F[2g] - F[3g] - ...`, with all
arithmetic done modulo `10⁹ + 7`. Descending order guarantees every exact
multiple count is final before it is subtracted.

### Hint 5

The answer is the sum of `g * F[g]` over all `g`.
