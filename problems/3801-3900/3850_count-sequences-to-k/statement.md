# Count Sequences to K

## Description

You are given an integer array nums, and an integer k.

Start with an initial value val = 1 and process nums from left to right.
At each index i, you must choose exactly one of the following actions:

- Multiply val by nums[i].
- Divide val by nums[i].
- Leave val unchanged.

After processing all elements, val is considered equal to k only if its
final rational value exactly equals k.

Return the count of distinct sequences of choices that result in val == k.

Note: Division is rational (exact), not integer division. For example,
2 / 4 = 1 / 2.

### Example 1

```text
Input: nums = [2,3,2], k = 6
Output: 2
Explanation: The following 2 distinct sequences of choices result in val
== k:
1. Multiply: val = 1 * 2 = 2; Multiply: val = 2 * 3 = 6; Leave val
   unchanged. Final val = 6.
2. Leave val unchanged; Multiply: val = 1 * 3 = 3; Multiply: val = 3 * 2
   = 6. Final val = 6.
```

### Example 2

```text
Input: nums = [4,6,3], k = 2
Output: 2
Explanation: The following 2 distinct sequences of choices result in val
== k:
1. Multiply: val = 1 * 4 = 4; Divide: val = 4 / 6 = 2 / 3; Multiply:
   val = (2 / 3) * 3 = 2. Final val = 2.
2. Leave val unchanged; Multiply: val = 1 * 6 = 6; Divide: val = 6 / 3
   = 2. Final val = 2.
```

### Example 3

```text
Input: nums = [1,5], k = 1
Output: 3
Explanation: The following 3 distinct sequences of choices result in val
== k:
1. Multiply: val = 1 * 1 = 1; Leave val unchanged. Final val = 1.
2. Divide: val = 1 / 1 = 1; Leave val unchanged. Final val = 1.
3. Leave val unchanged; Leave val unchanged. Final val = 1.
```

### Constraints

- `1 <= nums.length <= 19`
- `1 <= nums[i] <= 6`
- `1 <= k <= 10¹⁵`

## Hints

### Hint 1

Represent numbers by their prime exponents as (2^x, 3^y, 5^z).

### Hint 2

Use Dynamic Programming on the prime exponents: let dp(idx, x, y, z) be the
number of ways to reach exponents (x,y,z) after processing index idx.

### Hint 3

When idx == nums.length, compare (x, y, z) to the prime exponent
decomposition of k and count matches.
