# Maximum Bitwise AND After Increment Operations

## Description

You are given an integer array nums and two integers k and m.

You may perform at most k operations. In one operation, you may choose any
index i and increase nums[i] by 1.

Return an integer denoting the maximum possible bitwise AND of any subset of
size m after performing up to k operations optimally.

### Example 1

```text
Input: nums = [3,1,2], k = 8, m = 2
Output: 6
Explanation: We need a subset of size m = 2. Choose indices [0, 2].
Increase nums[0] = 3 to 6 using 3 operations, and increase nums[2] = 2 to
6 using 4 operations. The total number of operations used is 7, which is
not greater than k = 8. The two chosen values become [6, 6], and their
bitwise AND is 6, which is the maximum possible.
```

### Example 2

```text
Input: nums = [1,2,8,4], k = 7, m = 3
Output: 4
Explanation: We need a subset of size m = 3. Choose indices [0, 1, 3].
Increase nums[0] = 1 to 4 using 3 operations, increase nums[1] = 2 to 4
using 2 operations, and keep nums[3] = 4. The total number of operations
used is 5, which is not greater than k = 7. The three chosen values become
[4, 4, 4], and their bitwise AND is 4, which is the maximum possible.
```

### Example 3

```text
Input: nums = [1,1], k = 3, m = 2
Output: 2
Explanation: We need a subset of size m = 2. Choose indices [0, 1].
Increase both values from 1 to 2 using 1 operation each. The total number
of operations used is 2, which is not greater than k = 3. The two chosen
values become [2, 2], and their bitwise AND is 2, which is the maximum
possible.
```

### Constraints

- `1 <= n == nums.length <= 5 * 10⁴`
- `1 <= nums[i] <= 10⁹`
- `1 <= k <= 10⁹`
- `1 <= m <= n`

## Hints

### Hint 1

Use a greedy bitwise approach.

### Hint 2

Iterate bits from highest to lowest and try setting the current bit in a
candidate res.

### Hint 3

To test a candidate, for each num compute the minimal increments needed so
that (num | candidate) == candidate; take the smallest m costs and check if
their sum <= k.

### Hint 4

If feasible, keep the bit in res and continue with accumulated bits.
