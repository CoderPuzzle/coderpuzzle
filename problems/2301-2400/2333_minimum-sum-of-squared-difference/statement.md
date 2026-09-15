# Minimum Sum of Squared Difference

## Description

You are given two positive 0-indexed integer arrays nums1 and nums2, both of
length n.

The sum of squared difference of arrays nums1 and nums2 is defined as the sum
of (nums1[i] - nums2[i])² for each 0 <= i < n.

You are also given two positive integers k1 and k2. You can modify any of the
elements of nums1 by +1 or -1 at most k1 times. Similarly, you can modify any
of the elements of nums2 by +1 or -1 at most k2 times.

Return the minimum sum of squared difference after modifying array nums1 at
most k1 times and modifying array nums2 at most k2 times.

Note: You are allowed to modify the array elements to become negative
integers.

### Example 1

```text
Input: nums1 = [1,2,3,4], nums2 = [2,10,20,19], k1 = 0, k2 = 0
Output: 579
Explanation: The elements in nums1 and nums2 cannot be modified because k1 =
0 and k2 = 0.
The sum of square difference will be: (1 - 2)² + (2 - 10)² + (3 - 20)² +
(4 - 19)² = 579.
```

### Example 2

```text
Input: nums1 = [1,4,10,12], nums2 = [5,8,6,9], k1 = 1, k2 = 1
Output: 43
Explanation: One way to obtain the minimum sum of square difference is:
- Increase nums1[0] once.
- Increase nums2[2] once.
The minimum of the sum of square difference will be:
(2 - 5)² + (4 - 8)² + (10 - 7)² + (12 - 9)² = 43.
Note that, there are other ways to obtain the minimum of the sum of square
difference, but there is no way to obtain a sum smaller than 43.
```

### Constraints

- `n == nums1.length == nums2.length`
- `1 <= n <= 10⁵`
- `0 <= nums1[i], nums2[i] <= 10⁵`
- `0 <= k1, k2 <= 10⁹`

## Hints

### Hint 1

There is no difference between the purpose of k1 and k2. Adding +1 to one
element in nums1 is same as performing -1 to one element in nums2, and vice
versa.

### Hint 2

Reduce the sum of squared difference greedily. One operation of k should use
the index that has the current maximum difference.

### Hint 3

Binary search the maximum difference for the final result.
