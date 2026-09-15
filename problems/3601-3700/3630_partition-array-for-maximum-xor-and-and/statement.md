# Partition Array for Maximum XOR and AND

## Description

You are given an integer array nums.

Partition the array into three (possibly empty) subsequences A, B, and C
such that every element of nums belongs to exactly one subsequence.

Your goal is to maximize the value of: XOR(A) + AND(B) + XOR(C)

where:

- XOR(arr) denotes the bitwise XOR of all elements in arr. If arr is
  empty, its value is defined as 0.
- AND(arr) denotes the bitwise AND of all elements in arr. If arr is
  empty, its value is defined as 0.

Return the maximum value achievable.

Note: If multiple partitions result in the same maximum sum, you can
consider any one of them.

### Example 1

```text
Input: nums = [2,3]
Output: 5
Explanation: One optimal partition is:
- A = [3], XOR(A) = 3
- B = [2], AND(B) = 2
- C = [], XOR(C) = 0
The maximum value of: XOR(A) + AND(B) + XOR(C) = 3 + 2 + 0 = 5. Thus,
the answer is 5.
```

### Example 2

```text
Input: nums = [1,3,2]
Output: 6
Explanation: One optimal partition is:
- A = [1], XOR(A) = 1
- B = [2], AND(B) = 2
- C = [3], XOR(C) = 3
The maximum value of: XOR(A) + AND(B) + XOR(C) = 1 + 2 + 3 = 6. Thus,
the answer is 6.
```

### Example 3

```text
Input: nums = [2,3,6,7]
Output: 15
Explanation: One optimal partition is:
- A = [7], XOR(A) = 7
- B = [2,3], AND(B) = 2
- C = [6], XOR(C) = 6
The maximum value of: XOR(A) + AND(B) + XOR(C) = 7 + 2 + 6 = 15. Thus,
the answer is 15.
```

### Constraints

- `1 <= nums.length <= 19`
- `1 <= nums[i] <= 10⁹`

## Hints

### Hint 1

Brute-force all subsets for B.

### Hint 2

Let s = XOR of all elements not in B.

### Hint 3

We want to choose a value x (a subset‐XOR of the "remaining" elements) to maximize x + (s XOR x).

### Hint 4

Observe that x + (s XOR x) = s + 2 * (x AND ~s).

### Hint 5

To do this efficiently, build a linear XOR basis over the values nums[j] & ~s for each index j not in B.

### Hint 6

Finally, greedily extract the maximum x from that basis.
