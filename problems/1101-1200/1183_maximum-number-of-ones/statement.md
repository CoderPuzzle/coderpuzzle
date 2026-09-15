# Maximum Number of Ones

## Description

Consider a matrix M with dimensions `width * height`, such that every cell
has value 0 or 1, and any square sub-matrix of M of size
`sideLength * sideLength` has at most `maxOnes` ones.

Return the maximum possible number of ones that the matrix M can have.

### Example 1

```text
Input: width = 3, height = 3, sideLength = 2, maxOnes = 1
Output: 4
Explanation:
In a 3*3 matrix, no 2*2 sub-matrix can have more than 1 one.
The best solution that has 4 ones is:
[1,0,1]
[0,0,0]
[1,0,1]
```

### Example 2

```text
Input: width = 3, height = 3, sideLength = 2, maxOnes = 2
Output: 6
Explanation:
[1,0,1]
[1,0,1]
[1,0,1]
```

### Constraints

- `1 <= width, height <= 100`
- `1 <= sideLength <= width, height`
- `0 <= maxOnes <= sideLength * sideLength`

## Hints

### Hint 1

Think of a greedy mathematical solution.

### Hint 2

Say you choose to set some cell `(i, j)` to 1, all cells `(x, y)` such that
`i % sideLength == x % sideLength` and `j % sideLength == y % sideLength`
can also be set to 1 without increasing the max number of ones in a
sub-matrix.

### Hint 3

In one move, choose to set all the cells with some modulus
`(i % sideLength, j % sideLength)` to 1.

### Hint 4

Choose the cells with max frequency.
