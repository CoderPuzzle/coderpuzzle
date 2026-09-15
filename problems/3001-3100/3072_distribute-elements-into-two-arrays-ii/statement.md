# Distribute Elements Into Two Arrays II

## Description

You are given a 1-indexed array of integers `nums` of length `n`.

Define `greaterCount(arr, val)` as the number of elements in `arr` that are
strictly greater than `val`.

You need to distribute all the elements of `nums` between two arrays `arr1`
and `arr2` using `n` operations. In the first operation, append `nums[1]` to
`arr1`. In the second operation, append `nums[2]` to `arr2`. Afterwards, in
the `i`-th operation:

- If `greaterCount(arr1, nums[i]) > greaterCount(arr2, nums[i])`, append `nums[i]` to `arr1`.
- If `greaterCount(arr1, nums[i]) < greaterCount(arr2, nums[i])`, append `nums[i]` to `arr2`.
- If `greaterCount(arr1, nums[i]) == greaterCount(arr2, nums[i])`, append `nums[i]` to the array with a lesser number of elements.
- If there is still a tie, append `nums[i]` to `arr1`.

The array `result` is formed by concatenating `arr1` and `arr2`. For example,
if `arr1 == [1,2,3]` and `arr2 == [4,5,6]`, then `result = [1,2,3,4,5,6]`.

Return the integer array `result`.

### Example 1

```text
Input: nums = [2,1,3,3]
Output: [2,3,1,3]
Explanation: After the first 2 operations, arr1 = [2] and arr2 = [1].
In the 3rd operation, the number of elements greater than 3 is zero in both
arrays. Also, the lengths are equal, hence append nums[3] to arr1.
In the 4th operation, the number of elements greater than 3 is zero in both
arrays. As the length of arr2 is lesser, append nums[4] to arr2.
After 4 operations, arr1 = [2,3] and arr2 = [1,3], so the result is [2,3,1,3].
```

### Example 2

```text
Input: nums = [5,14,3,1,2]
Output: [5,3,1,2,14]
Explanation: After the first 2 operations, arr1 = [5] and arr2 = [14].
In the 3rd operation, the number of elements greater than 3 is one in both
arrays. Also, the lengths are equal, hence append nums[3] to arr1.
In the 4th operation, the number of elements greater than 1 is greater in
arr1 than arr2 (2 > 1). Hence append nums[4] to arr1.
In the 5th operation, the number of elements greater than 2 is greater in
arr1 than arr2 (2 > 1). Hence append nums[5] to arr1.
After 5 operations, arr1 = [5,3,1,2] and arr2 = [14], so the result is
[5,3,1,2,14].
```

### Example 3

```text
Input: nums = [3,3,3,3]
Output: [3,3,3,3]
Explanation: At the end of 4 operations, arr1 = [3,3] and arr2 = [3,3].
```

### Constraints

- `3 <= n <= 10⁵`
- `1 <= nums[i] <= 10⁹`

## Hints

### Hint 1

We need a data structure that counts the number of integers greater than a given value x and supports insertion.

### Hint 2

Use a Segment Tree or Binary Indexed Tree by compressing the numbers to the range [1, n].

### Hint 3

Simulate the operations, keeping each array's length so ties are broken toward the shorter array and then toward arr1.
