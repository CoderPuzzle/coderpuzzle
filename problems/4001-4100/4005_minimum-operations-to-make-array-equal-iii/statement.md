# Minimum Operations to Make Array Equal III

## Description

You are given an integer array `nums`.

In one operation, you may choose any element `nums[i]` and perform one of
the following:

- Multiply `nums[i]` by an integer `k`, where `k >= 2`.
- Divide `nums[i]` by an integer `k`, where `2 <= k < nums[i]`, provided
  that `nums[i]` is divisible by `k`.

Return the minimum number of operations required to make all elements of
`nums` equal.

### Example 1

```text
Input: nums = [6,12,8]
Output: 3
Explanation: We can perform following operates to make all numbers to 6:

- Divide nums[1] = 12 by 2 to get 6.
- Divide nums[2] = 8 by 4 to get 2.
- Multiply nums[2] = 2 by 3 to get 6.
```

### Example 2

```text
Input: nums = [5,15,20]
Output: 2
Explanation: We can perform following operates to make all numbers to 5:

- Divide nums[1] = 15 by 3 to get 5.
- Divide nums[2] = 20 by 4 to get 5.
```

### Example 3

```text
Input: nums = [7,7,7]
Output: 0
Explanation: All elements are already equal, so no operations are needed.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁹`

## Hints

### Hint 1

For a fixed target x > 1, an element needs zero operations if it equals x, one operation if it divides x or is divisible by x, and two operations otherwise.

### Hint 2

A common multiple of all elements can be reached using at most nums.length operations. Any target not present in nums costs at least one operation per element, so only distinct values already present in nums need to be considered. Handle the case where all elements are 1 separately.

### Hint 3

Count the frequency of every distinct value. Precompute all primes up to sqrt(10⁹), then factor each distinct value and generate all of its divisors.

### Hint 4

For every distinct value v, add its frequency to multipleCount[d] for each divisor d of v. Thus, multipleCount[x] gives the number of elements divisible by a candidate target x. The number of elements dividing x can be found by summing the frequencies of the divisors of x.

### Hint 5

If equal elements equal x, divisible other elements are divisible by x, and divisors other elements divide x, then the cost is 2 * nums.length - 2 * equal - divisible - divisors. Minimize this over all distinct targets greater than 1.
