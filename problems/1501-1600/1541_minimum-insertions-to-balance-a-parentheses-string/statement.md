# Minimum Insertions to Balance a Parentheses String

## Description

You are given a string `s` that contains only the characters `(` and `)`.
Unlike the usual parentheses rule, this string uses a **2:1 balance rule**:

- Every `(` must be matched by exactly two consecutive `)` characters
  immediately forming its closing pair — think of `(` as an opener and the
  two-character sequence `))` as the corresponding closer.
- An opener must appear before the two closing `)` characters it is paired
  with.

For example, `())`, `())(())))` and `(())())))` are balanced under this
rule, while `)()`, `()))` and `(()))` are not.

You may insert `(` or `)` characters at any positions in `s` to make it
balanced. Return the minimum number of insertions required.

### Example 1

```text
Input: s = "(()))"
Output: 1
Explanation: The second '(' already has its matching '))', but the first
'(' is only followed by a single ')'. Inserting one more ')' at the end
gives "(())))", which is balanced.
```

### Example 2

```text
Input: s = "())"
Output: 0
Explanation: The string is already balanced: the single '(' is followed by
exactly two consecutive ')' characters.
```

### Example 3

```text
Input: s = "))())("
Output: 3
Explanation: Insert '(' before the leading "))" to close it, and insert
"))" after the trailing '(' to close that one, for a total of 3
insertions.
```

### Constraints

- `1 <= s.length <= 10⁵`
- `s` consists of `(` and `)` only.

## Hints

### Hint 1

Scan the string while tracking how many `(` are still waiting for their
`))`. When you see a lone `)` that is not immediately followed by another
`)`, treat it as if the missing `)` had been inserted right there, and add
one to the answer.

### Hint 2

If a completed `))` pair has no waiting `(` to match, add one to the
answer for the missing `(`. After the scan, any `(` still waiting needs a
full `))` appended, so add twice the number of leftover `(`.
