# N-Repeated Element in Size 2N Array

## Description

You are given an integer array `nums` with the following properties:

- `nums.length == 2 * n`
- `nums` contains `n + 1` unique values, `n` of which occur exactly once in
  the array
- exactly one element of `nums` is repeated `n` times

Return the element that is repeated `n` times.

### Example 1

```text
Input: nums = [1,2,3,3]
Output: 3
Explanation: The array holds 2 * n = 4 elements, so n = 2. The values 1 and 2
occur exactly once, while 3 fills the remaining two slots — n times — so 3 is
the repeated element.
```

### Example 2

```text
Input: nums = [2,1,2,5,3,2]
Output: 2
Explanation: Here n = 3. The values 1, 3, and 5 occur exactly once, and 2
appears three times — n times — scattered among them, so the answer is 2.
```

### Example 3

```text
Input: nums = [5,1,5,2,5,3,5,4]
Output: 5
Explanation: Here n = 4. The values 1, 2, 3, and 4 occur exactly once, and 5
occupies the other four slots, so 5 is the element repeated n times.
```

### Constraints

- `2 <= n <= 5000`
- `nums.length == 2 * n`
- `0 <= nums[i] <= 10⁴`
- `nums` contains `n + 1` unique elements and one of them is repeated exactly
  `n` times
