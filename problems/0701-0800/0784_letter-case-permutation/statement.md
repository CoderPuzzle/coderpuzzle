# Letter Case Permutation

## Description

Given a string `s`, you can transform every letter individually to be
lowercase or uppercase to create another string; digits carry no case and
stay as they are.

Return a list of all possible strings we could create.

The set of strings has no natural order and any arrangement of it is a
correct answer, but this judge compares the output exactly, so the order
is pinned: the case of an earlier letter varies slowest, and every letter
appears in the case `s` already gives it before the flipped one.
Equivalently: start from the list `[s]`, scan `s` from left to right, and
at each letter insert, right after every string built so far, a copy of
that string with this one letter's case flipped. The examples list their
outputs in exactly this order.

### Example 1

```text
Input: s = "a1b2"
Output: ["a1b2","a1B2","A1b2","A1B2"]
```

### Example 2

```text
Input: s = "3z4"
Output: ["3z4","3Z4"]
```

### Constraints

- `1 <= s.length <= 12`
- `s` consists of lowercase English letters, uppercase English letters,
  and digits.
