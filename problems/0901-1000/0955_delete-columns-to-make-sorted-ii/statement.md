# Delete Columns to Make Sorted II

## Description

You are given an array of `n` strings `strs`, all of the same length.

The strings can be arranged one per line, making a grid; the `j`-th column
of the grid holds the `j`-th character of every string. You may choose any
set of deletion indices and delete, in every string, the character at each
of those indices. For `strs = ["abcdef","uvwxyz"]` and deletion indices
`{0, 2, 3}`, the array that survives is `["bef", "vyz"]`.

A choice of deletion indices is good when, after the deletions, the array
is in lexicographic order top to bottom — that is, when
`strs[0] <= strs[1] <= strs[2] <= ... <= strs[n - 1]`, each comparison
reading the shortened strings as ordinary words. Note what this does not
demand: the rows themselves need not be sorted, and a pair of equal rows is
always fine.

Return the minimum possible size of a good set of deletion indices.

### Example 1

```text
Input: strs = ["ca","bb","ac"]
Output: 1
Explanation: Deleting the first column leaves ["a", "b", "c"], which is in
lexicographic order. The original array is not in lexicographic order, so
at least one deletion is necessary, and the answer is 1.
```

### Example 2

```text
Input: strs = ["xc","yb","za"]
Output: 0
Explanation: The array is already in lexicographic order, so nothing needs
to be deleted. Note that the rows themselves are not sorted: it is not
necessarily true that strs[0][0] <= strs[0][1] <= ...
```

### Example 3

```text
Input: strs = ["zyx","wvu","tsr"]
Output: 3
Explanation: Each column, weighed against the row pairs that no earlier
column has settled, still breaks the order — so we have to delete every
column.
```

### Constraints

- `n == strs.length`
- `1 <= n <= 100`
- `1 <= strs[i].length <= 100`
- `strs[i]` consists of lowercase English letters.
