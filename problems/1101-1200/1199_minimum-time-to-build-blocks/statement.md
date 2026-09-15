# Minimum Time to Build Blocks

## Description

You are given a list of blocks, where blocks[i] = t means that the i-th block
needs t units of time to be built. A block can only be built by exactly one
worker.

A worker can either split into two workers (number of workers increases by
one) or build a block then go home. Both decisions cost some time.

The time cost of spliting one worker into two workers is given as an integer
split. Note that if two workers split at the same time, they split in
parallel so the cost would be split.

Output the minimum time needed to build all blocks.

Initially, there is only one worker.

### Example 1

```text
Input: blocks = [1], split = 1
Output: 1
Explanation: We use 1 worker to build 1 block in 1 time unit.
```

### Example 2

```text
Input: blocks = [1,2], split = 5
Output: 7
Explanation: We split the worker into 2 workers in 5 time units then assign
each of them to a block so the cost is 5 + max(1, 2) = 7.
```

### Example 3

```text
Input: blocks = [1,2,3], split = 1
Output: 4
Explanation: Split 1 worker into 2, then assign the first worker to the last
block and split the second worker into 2.
Then, use the two unassigned workers to build the first two blocks.
The cost is 1 + max(3, 1 + max(1, 2)) = 4.
```

### Constraints

- `1 <= blocks.length <= 1000`
- `1 <= blocks[i] <= 10⁵`
- `1 <= split <= 100`

## Hints

### Hint 1

A greedy approach will not work as the examples show.

### Hint 2

Try all possible moves using DP.

### Hint 3

For the DP state, dp[i][j] is the minimum time cost to build the first i
blocks using j workers.

### Hint 4

In one step you can either assign a worker to a block or choose a number of
workers to split.

### Hint 5

If you choose to assign a worker to a block it is always better to assign him
to the block with the maximum time so we sort the array before using DP.

### Hint 6

To optimize the solution from O(n^3) to O(n^2) notice that if you choose to
split, it is always better to split all the workers you have.
