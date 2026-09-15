# String Without AAA or BBB

## Description

Given two integers `a` and `b`, return a string `s` such that:

- `s` has length `a + b` and contains exactly `a` letters `'a'` and exactly
  `b` letters `'b'`,

- the substring `'aaa'` does not occur in `s`, and

- the substring `'bbb'` does not occur in `s`.

There is at least one valid `s` for the given `a` and `b`.

Several strings can meet the conditions for the same `a` and `b`, but this judge
compares one exact answer, so the required return is pinned to a single
deterministic construction: call the letter with the larger count `big` and the
other letter `small` — `'a'` is `big` when the counts tie. While more of `big`
remains than of `small` and `small` has not run out, append two `big` letters
followed by one `small` letter. Then, while any letters remain, append one `big`
letter if any are left, then one `small` letter if any are left.

### Example 1

```text
Input: a = 1, b = 2
Output: "bba"
Explanation: 'b' is big, 2 against 1, so the double step "bba" consumes all
three letters at once. The strings "abb" and "bab" would also satisfy the
conditions, but the pinned form above is the required answer.
```

### Example 2

```text
Input: a = 4, b = 1
Output: "aabaa"
Explanation: The double step "aab" leaves two a's and no b's, and the closing
loop appends those two a's. The single b splits the a's into two runs of at
most two each, so "aabaa" is in fact the only string meeting the conditions.
```

### Constraints

- `0 <= a, b <= 100`
- It is guaranteed such an `s` exists for the given `a` and `b`.
- Every input honors that guarantee: when one of `a` and `b` is `0`, the other
  is at most `2`; otherwise the larger of the two is at most twice the smaller
  plus `2`.
