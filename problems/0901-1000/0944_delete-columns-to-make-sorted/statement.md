# Delete Columns to Make Sorted

## Description

You are given an array of `n` strings `strs`, all of the same length.

The strings can be arranged such that there is one on each line, making a
grid. The `j`-th column of the grid holds the `j`-th character of every
string, read from top to bottom. For `strs = ["abc","bce","cae"]`, column
0 is `'a','b','c'` and column 2 is `'c','e','e'`, both sorted, while
column 1 is `'b','c','a'`, which is not.

You want to delete the columns that are not sorted lexicographically. A
column is sorted when its characters stand in non-decreasing order from
top to bottom, so equal characters count as sorted. In the example above
(0-indexed), you would delete column 1.

Return the number of columns that you will delete.

### Example 1

```text
Input: strs = ["cba","daf","ghi"]
Output: 1
Explanation: Columns 0 and 2 are sorted, but column 1 is not, so you
only need to delete 1 column.
```

### Example 2

```text
Input: strs = ["a","b"]
Output: 0
Explanation: Column 0 is the only column and is sorted, so you will not
delete any columns.
```

### Example 3

```text
Input: strs = ["zyx","wvu","tsr"]
Output: 3
Explanation: All 3 columns are not sorted, so you will delete all 3.
```

### Constraints

- `1 <= strs.length <= 100`
- `1 <= strs[i].length <= 1000`
- `strs[i]` consists of lowercase English letters.
