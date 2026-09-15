# Count Elements With at Least K Greater Values

## Description

You are given an integer array `nums` of length `n` and an integer `k`. An
element of `nums` is **qualified** when at least `k` elements of the array
are strictly greater than it. Every occurrence counts: if a value appears
several times, each position holding it is judged on its own, and elements
greater than it are counted with their multiplicity.

Return the number of qualified elements in `nums`.

### Example 1

```text
Input: nums = [3,1,2], k = 1
Output: 2
Explanation: 1 has two elements greater than it and 2 has one, so both
qualify. Nothing is greater than 3.
```

### Example 2

```text
Input: nums = [5,5,5], k = 2
Output: 0
Explanation: All values are equal, so no element is strictly greater than
another and no element can have even one greater value.
```

### Constraints

- `1 <= n == nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁹`
- `0 <= k < n`

## Hints

### Hint 1

Sorting orders the array so that, for any value, the elements strictly
greater than it form one contiguous suffix.

### Hint 2

After sorting ascending, an element at sorted index `i` has exactly `n - i -
1` elements strictly greater than it only when its neighbors differ; count
multiplicities carefully at runs of equal values.

### Hint 3

The answer never needs per-element work: in sorted order every element
strictly below the value at index `n - k - 1` qualifies, and everything at
or above that value does not, except that the run of values equal to that
threshold joins only when its own strictly-greater count reaches `k`.
