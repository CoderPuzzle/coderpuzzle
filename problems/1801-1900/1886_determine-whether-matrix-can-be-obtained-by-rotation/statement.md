# Determine Whether Matrix Can Be Obtained By Rotation

## Description

Given two `n x n` binary matrices `mat` and `target`, return `true` if
it is possible to make `mat` equal to `target` by rotating `mat` in
90-degree increments, or return `false` otherwise.

### Example 1

![diagram](figures/1886-1.svg)

```text
Input: mat = [[0,1],[1,0]], target = [[1,0],[0,1]]
Output: true
Explanation: We can rotate mat 90 degrees clockwise to make mat equal
target.
```

### Example 2

![diagram](figures/1886-2.svg)

```text
Input: mat = [[0,1],[1,1]], target = [[1,0],[0,1]]
Output: false
Explanation: It is impossible to make mat equal to target by rotating
mat.
```

### Example 3

![diagram](figures/1886-3.svg)

```text
Input: mat = [[0,0,0],[0,1,0],[1,1,1]],
       target = [[1,1,1],[0,1,0],[0,0,0]]
Output: true
Explanation: We can rotate mat 90 degrees clockwise two times to make
mat equal target.
```

### Constraints

- `n == mat.length == target.length`
- `n == mat[i].length == target[i].length`
- `1 <= n <= 10`
- `mat[i][j]` and `target[i][j]` are either 0 or 1.

## Hints

### Hint 1

What is the maximum number of rotations you have to check?

### Hint 2

Is there a formula you can use to rotate a matrix 90 degrees?
