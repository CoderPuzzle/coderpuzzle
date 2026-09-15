# Odd Even Jump

## Description

You are given an integer array `arr`. From some starting index, you can make
a series of jumps. The jumps numbered 1, 3, 5, ... are called odd-numbered
jumps, and the jumps numbered 2, 4, 6, ... are called even-numbered jumps.
Note that the jumps are numbered, not the indices.

You may jump forward from index `i` to index `j` (with `i < j`) in the
following way:

- During odd-numbered jumps (i.e., jumps 1, 3, 5, ...), you jump to the
  index `j` such that `arr[i] <= arr[j]` and `arr[j]` is the smallest
  possible value. If there are multiple such indices `j`, you can only jump
  to the smallest such index `j`.
- During even-numbered jumps (i.e., jumps 2, 4, 6, ...), you jump to the
  index `j` such that `arr[i] >= arr[j]` and `arr[j]` is the largest
  possible value. If there are multiple such indices `j`, you can only jump
  to the smallest such index `j`.
- It may be the case that for some index `i`, there are no legal jumps.

A starting index is good if, starting from that index, you can reach the end
of the array (index `arr.length - 1`) by jumping some number of times
(possibly 0 or more than once).

Return the number of good starting indices.

### Example 1

```text
Input: arr = [10,13,12,14,15]
Output: 2
Explanation: From starting index i = 0, the 1st jump goes to i = 2, because
arr[2] = 12 is the smallest value among arr[1], arr[2], arr[3], arr[4] that
is greater than or equal to arr[0] = 10; from i = 2 there is no further
jump. From starting indices i = 1 and i = 2, the 1st jump goes to i = 3,
then no further jump is possible. From starting index i = 3, the 1st jump
goes to i = 4, so the end is reached. From starting index i = 4, the end is
already reached. In total there are 2 good starting indices, i = 3 and
i = 4.
```

### Example 2

```text
Input: arr = [2,3,1,1,4]
Output: 3
Explanation: From starting index i = 0, the jumps go to i = 1, i = 2, i = 3.
The 1st jump (odd-numbered) goes to i = 1, because arr[1] = 3 is the
smallest value in [arr[1], arr[2], arr[3], arr[4]] that is greater than or
equal to arr[0] = 2. The 2nd jump (even-numbered) goes from i = 1 to i = 2,
because arr[2] = 1 is the largest value in [arr[2], arr[3], arr[4]] that is
less than or equal to arr[1] = 3; arr[3] is also that largest value, but 2
is the smaller index, so the jump goes to i = 2 and not i = 3. The 3rd jump
(odd-numbered) goes from i = 2 to i = 3, because arr[3] = 1 is the smallest
value in [arr[3], arr[4]] that is greater than or equal to arr[2] = 1. No
jump from i = 3 is legal, so i = 0 is not good. From starting index i = 1,
the 1st jump goes to i = 4, reaching the end. From starting index i = 2,
the 1st jump goes to i = 3, then no jump is legal. From starting index
i = 3, the 1st jump goes to i = 4, reaching the end. From starting index
i = 4, the end is already reached. In total there are 3 good starting
indices, i = 1, i = 3, and i = 4.
```

### Example 3

```text
Input: arr = [5,1,3,4,2]
Output: 3
Explanation: The end is reachable from starting indices 1, 2, and 4.
```

### Constraints

- `1 <= arr.length <= 2 * 10⁴`
- `0 <= arr[i] < 10⁵`
