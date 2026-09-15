# Shifting Letters

## Description

You are given a string `s` of lowercase English letters and an integer array
`shifts` of the same length.

Define the shift of a letter as the next letter in the alphabet, wrapping
around so that `'z'` becomes `'a'`. For example, shifting `'a'` gives `'b'`,
shifting `'t'` gives `'u'`, and shifting `'z'` gives `'a'`.

Now for each `shifts[i] = x`, shift the first `i + 1` letters of `s`, `x`
times.

Return the final string after all such shifts are applied to `s`.

### Example 1

```text
Input: s = "abc", shifts = [3,5,9]
Output: "rpl"
Explanation: We start with "abc".
After shifting the first 1 letters of s by 3, we have "dbc".
After shifting the first 2 letters of s by 5, we have "igc".
After shifting the first 3 letters of s by 9, we have "rpl", the answer.
```

### Example 2

```text
Input: s = "aaa", shifts = [1,2,3]
Output: "gfd"
```

### Constraints

- `1 <= s.length <= 10⁵`
- `s` consists of lowercase English letters.
- `shifts.length == s.length`
- `0 <= shifts[i] <= 10⁹`
