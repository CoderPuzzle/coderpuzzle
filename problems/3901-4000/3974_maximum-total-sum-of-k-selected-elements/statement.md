# Maximum Total Sum of K Selected Elements

## Description

You are given an integer array nums and two integers k and mul.

Select exactly k elements from nums. Process these elements one by one in any order you choose.

For each selected element, independently choose one of the following:

- Add the element's value to the total sum, or
- Multiply the element by the current value of mul and add the result to the total sum.

After processing each selected element, mul decreases by 1, regardless of which option was chosen. The current value of mul may become 0 or negative.

Return an integer denoting the maximum possible total sum.

### Example 1

```text
Input: nums = [6,1,2,9], k = 3, mul = 2

Output: 26

Explanation:

One optimal way:

    One optimal selection is nums[3] = 9, nums[0] = 6, and nums[2] = 2.
    Process nums[3] = 9 first: choose multiplication, so it contributes 9 * 2 = 18. Now, mul becomes 1.
    Process nums[0] = 6 next: choose multiplication, so it contributes 6 * 1 = 6. Now, mul becomes 0.
    Process nums[2] = 2 last: choose addition, so it contributes 2.
    The total sum is 18 + 6 + 2 = 26.
```

### Example 2

```text
Input: nums = [3,7,5,2], k = 2, mul = 4

Output: 43

Explanation:

One optimal way:

    One optimal selection is nums[1] = 7 and nums[2] = 5.
    Process nums[1] = 7 first: choose multiplication, so it contributes 7 * 4 = 28. Now, mul becomes 3.
    Process nums[2] = 5 next: choose multiplication, so it contributes 5 * 3 = 15.
    The total sum is 28 + 15 = 43.
```

### Example 3

```text
Input: nums = [4,4], k = 1, mul = 1

Output: 4

Explanation:

One optimal way:

    One optimal selection is nums[0] = 4.
    Process nums[0] = 4: choose multiplication, so it contributes 4 * 1 = 4.
    The total sum is 4.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁵`
- `1 <= k <= nums.length`
- `1 <= mul <= 10⁵`

## Hints

### Hint 1

Suppose the selected elements are fixed. Which elements should be multiplied, and in what order should they be processed?

### Hint 2

Since every nums[i] is positive, multiplying by a current value greater than 1 is always at least as good as adding normally.

### Hint 3

Only the first min(k, mul - 1) processed elements should be multiplied. All remaining selected elements should be added normally.

### Hint 4

Choose the largest k elements of nums, and pair the largest selected elements with the largest multipliers.
