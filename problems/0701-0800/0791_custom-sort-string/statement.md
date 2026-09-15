# Custom Sort String

## Description

You are given two strings `order` and `s`. All the characters of `order` are
unique and were sorted in some custom order previously.

Permute the characters of `s` so that they match the order that `order` was
sorted. More specifically, if a character `x` occurs before a character `y` in
`order`, then `x` should occur before `y` in the permuted string.

Return any permutation of `s` that satisfies this property.

The original exercise accepts any such permutation; this judge compares
strings exactly, so pin one deterministic form: emit every character of `s`
that appears in `order` first, in `order`'s relative order and each as many
times as it occurs in `s`, then emit the characters of `s` that do not appear
in `order`, keeping their original order within `s`.

### Example 1

```text
Input: order = "cba", s = "abcd"
Output: "cbad"
Explanation: "a", "b", "c" appear in order, so the order of "a", "b", "c"
should be "c", "b", "a". Since "d" does not appear in order, it can sit at
any position in the original exercise — "dcba", "cdba", "cbda" are also
valid there. Under the pinned form "d" trails after "cba", so the expected
string is "cbad".
```

### Example 2

```text
Input: order = "bcafg", s = "abcd"
Output: "bcad"
Explanation: The characters "b", "c", "a" from order dictate the order of
those characters in s. Following the order of appearance in order, they are
arranged as "b", "c", "a". The character "d" does not appear in order, so
under the pinned form it follows after "bca", giving "bcad".
```

### Constraints

- `1 <= order.length <= 26`
- `1 <= s.length <= 200`
- `order` and `s` consist of lowercase English letters.
- All the characters of `order` are unique.
