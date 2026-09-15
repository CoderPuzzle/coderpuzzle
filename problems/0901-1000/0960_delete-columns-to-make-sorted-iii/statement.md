# Delete Columns to Make Sorted III

## Description

You are given an array of `n` strings `strs`, all of the same length.

You may choose any set of deletion indices and delete the characters at
those indices from every string. For `strs = ["abcdef","uvwxyz"]`,
deleting indices `{0, 2, 3}` turns the array into `["bef","vyz"]`.

A choice of deletion indices is good when, afterwards, every string (row)
is in lexicographic order by itself: reading any single row from left to
right, its remaining characters never decrease —
`strs[i][0] <= strs[i][1] <= ... <= strs[i][k]` for each row `i`. The rows
do not have to be ordered against each other; one row may stand
lexicographically above or below its neighbor, and neither direction
matters.

Return the minimum possible number of deletion indices in a good choice.

### Example 1

```text
Input: strs = ["babca","bbazb"]
Output: 3
Explanation: Deleting columns 0, 1, and 4 leaves ["bc","az"], and both
rows are in lexicographic order on their own. Note that "bc" > "az": the
rows are not ordered against each other, and they do not need to be.
```

### Example 2

```text
Input: strs = ["edcba"]
Output: 4
Explanation: Delete fewer than 4 columns and the only row still descends
somewhere, so a single character is the most it can keep.
```

### Example 3

```text
Input: strs = ["ghi","def","abc"]
Output: 0
Explanation: Every row is already in lexicographic order, so nothing has
to be deleted.
```

### Constraints

- `n == strs.length`
- `1 <= n <= 100`
- `1 <= strs[i].length <= 100`
- `strs[i]` consists of lowercase English letters.
