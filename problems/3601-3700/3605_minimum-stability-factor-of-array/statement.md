# Minimum Stability Factor of Array

## Description

You are given an integer array `nums` and an integer `maxC`.

A subarray is called stable if the highest common factor (HCF) of all its
elements is greater than or equal to 2.

The stability factor of an array is defined as the length of its longest
stable subarray.

You may modify at most `maxC` elements of the array to any integer.

Return the minimum possible stability factor of the array after at most
`maxC` modifications. If no stable subarray remains, return 0.

Note:

- The highest common factor (HCF) of an array is the largest integer
  that evenly divides all the array elements.
- A subarray of length 1 is stable if its only element is greater than
  or equal to 2, since HCF([x]) = x.

### Example 1

```text
Input: nums = [3,5,10], maxC = 1
Output: 1
Explanation: The stable subarray [5, 10] has HCF = 5, which has a stability
factor of 2. Since maxC = 1, one optimal strategy is to change nums[1] to
7, resulting in nums = [3, 7, 10]. Now, no subarray of length greater than
1 has HCF >= 2. Thus, the minimum possible stability factor is 1.
```

### Example 2

```text
Input: nums = [2,6,8], maxC = 2
Output: 1
Explanation: The subarray [2, 6, 8] has HCF = 2, which has a stability
factor of 3. Since maxC = 2, one optimal strategy is to change nums[1] to
3 and nums[2] to 5, resulting in nums = [2, 3, 5]. Now, no subarray of
length greater than 1 has HCF >= 2. Thus, the minimum possible stability
factor is 1.
```

### Example 3

```text
Input: nums = [2,4,9,6], maxC = 1
Output: 2
Explanation: The stable subarrays are:
[2, 4] with HCF = 2 and stability factor of 2.
[9, 6] with HCF = 3 and stability factor of 2.
Since maxC = 1, the stability factor of 2 cannot be reduced due to two
separate stable subarrays. Thus, the minimum possible stability factor is
2.
```

### Constraints

- `1 <= n == nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁹`
- `0 <= maxC <= n`

## Hints

### Hint 1

Binary-search the target length `k`.

### Hint 2

For each `k`, use fast range-GCD queries.

### Hint 3

Greedily "hit" every window of size `k+1` with an edit if its GCD > 1.
