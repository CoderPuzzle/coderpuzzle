# Minimum Operations to Transform Array into Alternating Prime

## Description

You are given an integer array nums.

An array is considered alternating prime if:

- Elements at even indices (0-based) are prime numbers.
- Elements at odd indices are non-prime numbers.

In one operation, you may increment any element by 1.

Return the minimum number of operations required to transform nums into an
alternating prime array.

A prime number is a natural number greater than 1 with only two factors, 1
and itself.

### Example 1

```text
Input: nums = [1,2,3,4]
Output: 3
Explanation: The element at index 0 must be prime. Increment nums[0] = 1
to 2, using 1 operation. The element at index 1 must be non-prime.
Increment nums[1] = 2 to 4, using 2 operations. The element at index 2 is
already prime. The element at index 3 is already non-prime. Total
operations = 1 + 2 = 3.
```

### Example 2

```text
Input: nums = [5,6,7,8]
Output: 0
Explanation: The elements at indices 0 and 2 are already prime. The
elements at indices 1 and 3 are already non-prime. No operations are
needed.
```

### Example 3

```text
Input: nums = [4,4]
Output: 1
Explanation: The element at index 0 must be prime. Increment nums[0] = 4
to 5, using 1 operation. The element at index 1 is already non-prime.
Total operations = 1.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁵`

## Hints

### Hint 1

Each index can be handled independently. Focus on making each element valid
with the minimum increments.

### Hint 2

For even indices, find the smallest prime >= nums[i].

### Hint 3

For odd indices, find the smallest non-prime >= nums[i].

### Hint 4

Precompute primes efficiently (e.g., Sieve of Eratosthenes) to quickly
check or jump to the next valid number.

### Hint 5

For odd indices, note that any number > 2 becomes non-prime after at most 1
increment (except 2).
