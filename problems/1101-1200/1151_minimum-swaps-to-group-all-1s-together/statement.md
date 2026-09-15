# Minimum Swaps to Group All 1's Together

## Description

Given a binary array `data`, return the minimum number of swaps required
to group all `1`'s present in the array together **in any place** in the array.

### Example 1

```text
Input: data = [1,0,1,0,1]
Output: 1
Explanation: There are 3 ways to group all 1's together:
[1,1,1,0,0] using 1 swap.
[0,1,1,1,0] using 2 swaps.
[0,0,1,1,1] using 1 swap.
The minimum is 1.
```

### Example 2

```text
Input: data = [0,0,0,1,0]
Output: 0
Explanation: Since there is only one 1 in the array, no swaps are needed.
```

### Example 3

```text
Input: data = [1,0,1,0,1,0,0,1,1,0,1]
Output: 3
Explanation: One possible solution that uses 3 swaps is [0,0,0,0,0,1,1,1,1,1,1].
```

### Constraints

- `1 <= data.length <= 10^5`
- `data[i]` is either `0` or `1`.

## Hints

### Hint 1

How many 1's should be grouped together? It is just the total number of 1's in the array — call it ones.

### Hint 2

Every window of size ones needs some number of swaps to turn into a block of 1's; that number is the count of zeros inside the window.

### Hint 3

You do not need to recount the zeros from scratch at each position — slide the window one step at a time and update the count.
