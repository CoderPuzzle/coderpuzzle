# Maximum Alternating Sum of Squares

## Description

You are given an integer array `nums`. You may rearrange its elements into
any order you like before scoring it.

The alternating score of such an arrangement `arr` is defined as:

```text
score = arr[0]² - arr[1]² + arr[2]² - arr[3]² + ...
```

Terms at even indices enter positively and terms at odd indices enter
negatively.

Return the maximum alternating score any rearrangement of `nums` can reach.

### Example 1

```text
Input: nums = [1,2,3]
Output: 12
Explanation: The rearrangement [2,1,3] reaches the maximum score among all
arrangements of [1,2,3]:
score = 2² - 1² + 3² = 4 - 1 + 9 = 12.
```

### Example 2

```text
Input: nums = [1,-1,2,-2,3,-3]
Output: 16
Explanation: The rearrangement [-3,-1,-2,1,3,2] reaches the maximum score
among all arrangements:
score = (-3)² - (-1)² + (-2)² - 1² + 3² - 2² = 9 - 1 + 4 - 1 + 9 - 4 = 16.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `-4 * 10⁴ <= nums[i] <= 4 * 10⁴`

## Hints

### Hint 1

Squaring erases signs: only the absolute values of the elements matter.

### Hint 2

In the alternating sum, even indices contribute positively and odd indices
contribute negatively.
