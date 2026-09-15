# Jump Game IV

## Description

You are given an integer array `arr`. You are initially positioned at the first
index of the array.

In one step you can jump from index `i` to index:

- `i + 1` where `i + 1 < arr.length`.
- `i - 1` where `i - 1 >= 0`.
- `j` where `arr[i] == arr[j]` and `i != j`.

Return the minimum number of steps to reach the last index of the array.

Notice that you can not jump outside of the array at any time.

### Example 1

```text
Input: arr = [100,-23,-23,404,100,23,23,23,3,404]
Output: 3
Explanation: You need three jumps from index 0 --> 4 --> 3 --> 9. Note that index 9 is the last index of the array.
```

### Example 2

```text
Input: arr = [7]
Output: 0
Explanation: Start index is the last index. You do not need to jump.
```

### Example 3

```text
Input: arr = [7,6,9,6,9,6,9,7]
Output: 1
Explanation: You can jump directly from index 0 to index 7 which is the last index of the array.
```

### Constraints

- `1 <= arr.length <= 5 * 10^4`
- `-10^8 <= arr[i] <= 10^8`

## Hints

### Hint 1

Model the array as a graph: node `i` connects to `i - 1`, `i + 1`, and every
other index holding the same value; the answer is the shortest path from node
`0` to node `n - 1`.

### Hint 2

Group the indices by value with a hash map so the same-value neighbors of a
node can be enumerated without scanning the whole array each time.

### Hint 3

Once a value's index list has been used to expand a node, every index in that
list is already visited, so the list can be emptied — otherwise an array where
all values are equal degrades to quadratic work.
