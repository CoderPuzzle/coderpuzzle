# Check If String Is Transformable With Substring Sort Operations

## Description

Given two digit strings `s` and `t` of the same length, you may transform
`s` into `t` by repeatedly applying the following operation any number of
times:

- Choose a non-empty substring of `s` and sort its characters in place so
  they are in ascending order.

For example, applying the operation to the underlined substring of
`"14234"` (positions 1 through 3) results in `"12344"`.

Return `true` if `s` can be transformed into `t` this way, and `false`
otherwise.

### Example 1

```text
Input: s = "84532", t = "34852"
Output: true
Explanation: One sequence of sort operations that works:
"84532" (sort index 2 to 3) -> "84352"
"84352" (sort index 0 to 2) -> "34852"
```

### Example 2

```text
Input: s = "34521", t = "23415"
Output: true
Explanation: One sequence of sort operations that works:
"34521" (sort index 0 to 3) -> "23451"
"23451" (sort index 3 to 4) -> "23415"
```

### Example 3

```text
Input: s = "12345", t = "12435"
Output: false
```

### Constraints

- `s.length == t.length`
- `1 <= s.length <= 10⁵`
- `s` and `t` consist of only digits.

## Hints

### Hint 1

Suppose the next digit you need to place is `d`. How can you determine
whether an occurrence of `d` still available in `s` is able to reach that
position?

### Hint 2

Sorting a substring can only ever move a digit leftward past digits that
are strictly greater than it — never past a strictly smaller digit. Think
about what that means for the relative order of equal digits, and for
which occurrence of `d` you should use first.
