# String Transforms Into Another String

## Description

Given two strings `str1` and `str2` of the same length, determine whether
you can transform `str1` into `str2` by doing zero or more **conversions**.

In one conversion you can convert **all** occurrences of one character in
`str1` to any other lowercase English character.

Return `true` if and only if you can transform `str1` into `str2`.

### Example 1

```text
Input: str1 = "aabcc", str2 = "ccdee"
Output: true
Explanation: Convert 'c' to 'e' then 'b' to 'd' then 'a' to 'c'. Note that
the order of conversions matter.
```

### Example 2

```text
Input: str1 = "leetcode", str2 = "codeleet"
Output: false
Explanation: There is no way to transform str1 to str2.
```

### Constraints

- `1 <= str1.length == str2.length <= 10⁴`
- `str1` and `str2` contain only lowercase English letters.

## Hints

### Hint 1

Model the problem as a graph problem. Add an edge from one character to
another if you need to convert between them.

### Hint 2

What if one character needs to be converted into more than one character?

### Hint 3

There would be no solution. Thus, every node can have at most one outgoing
edge.

### Hint 4

How to process a linked list?

### Hint 5

How to process a cycle?

### Hint 6

What if there is a character with no outgoing edge? You can use it to break
all cycles!
