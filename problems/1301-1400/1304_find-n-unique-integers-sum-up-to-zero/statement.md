# Find N Unique Integers Sum up to Zero

## Description

Given an integer `n`, return any array containing `n` unique integers such that they add up to `0`.

### Example 1

```text
Input: n = 5
Output: [-7,-1,1,3,4]
Explanation: These arrays also are accepted [-5,-1,1,2,3] , [-3,-1,2,-2,4].
```

### Example 2

```text
Input: n = 3
Output: [-1,0,1]
```

### Example 3

```text
Input: n = 1
Output: [0]
```

### Constraints

- `1 <= n <= 1000`

## Hints

### Hint 1

Return an array where the values are symmetric. (+x , -x).

### Hint 2

If `n` is odd, append value 0 in your returned array.
