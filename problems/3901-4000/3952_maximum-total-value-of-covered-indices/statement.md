# Maximum Total Value of Covered Indices

## Description

You are given values `nums` and a binary string `s`; a `1` places a token at that index. Each token may be moved at most once, from index `i > 0` to `i - 1`. An index is covered if it contains a token after all moves.

Return the maximum sum of `nums` over covered indices.

### Example 1

```text
Input: nums = [9,2,6,1], s = "0101"
Output: 15
```

### Example 2

```text
Input: nums = [5,1,4], s = "001"
Output: 4
```

### Example 3

```text
Input: nums = [9,3,5], s = "011"
Output: 14
```

### Constraints

- `1 <= nums.length == s.length <= 10⁵`
- `1 <= nums[i] <= 10⁵`
- `s[i]` is `0` or `1`.

## Hints

### Hint 1

Treat each maximal token block together with the preceding zero, if one exists.

### Hint 2

Every index in that range except one can be covered, so omit its minimum value.
