# Lexicographically Maximum MEX Array

## Description

Repeatedly choose a nonempty prefix of `nums`, append its MEX to `result`, and remove that prefix. Return the lexicographically maximum possible `result`. The MEX is the smallest non-negative integer absent from an array.

### Example 1

```text
Input: nums = [0,1,0]
Output: [2,1]
```

### Example 2

```text
Input: nums = [1,0,2]
Output: [3]
```

### Example 3

```text
Input: nums = [3,1]
Output: [0,0]
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `0 <= nums[i] <= 10⁵`

## Hints

### Hint 1

The best next value is the MEX of the whole remaining suffix.

### Hint 2

Take the shortest prefix containing every value below that MEX. If the MEX is zero, take one element.
