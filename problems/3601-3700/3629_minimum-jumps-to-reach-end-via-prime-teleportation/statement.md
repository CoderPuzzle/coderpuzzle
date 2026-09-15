# Minimum Jumps to Reach End via Prime Teleportation

## Description

You are given an integer array nums of length n.

You start at index 0, and your goal is to reach index n - 1.

From any index i, you may perform one of the following operations:

- Adjacent Step: Jump to index i + 1 or i - 1, if the index is within
  bounds.
- Prime Teleportation: If nums[i] is a prime number p, you may instantly
  jump to any index j != i such that nums[j] % p == 0.

Return the minimum number of jumps required to reach index n - 1.

### Example 1

```text
Input: nums = [1,2,4,6]
Output: 2
Explanation: One optimal sequence of jumps is:
- Start at index i = 0. Take an adjacent step to index 1.
- At index i = 1, nums[1] = 2 is a prime number. Therefore, we teleport
  to index i = 3 as nums[3] = 6 is divisible by 2.
Thus, the answer is 2.
```

### Example 2

```text
Input: nums = [2,3,4,7,9]
Output: 2
Explanation: One optimal sequence of jumps is:
- Start at index i = 0. Take an adjacent step to index i = 1.
- At index i = 1, nums[1] = 3 is a prime number. Therefore, we teleport
  to index i = 4 since nums[4] = 9 is divisible by 3.
Thus, the answer is 2.
```

### Example 3

```text
Input: nums = [4,6,5,8]
Output: 3
Explanation: Since no teleportation is possible, we move through
0 → 1 → 2 → 3. Thus, the answer is 3.
```

### Constraints

- `1 <= n == nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁶`

## Hints

### Hint 1

Use a breadth-first search.

### Hint 2

Precompute prime factors of each nums[i] via a sieve, and build a bucket bucket[p] mapping each prime p to all indices j with nums[j] % p == 0.

### Hint 3

During the BFS, when at index i, enqueue its adjacent steps (i+1 and i-1) and all indices in bucket[p] for each prime p dividing nums[i], then clear bucket[p] so each prime's bucket is visited only once.
