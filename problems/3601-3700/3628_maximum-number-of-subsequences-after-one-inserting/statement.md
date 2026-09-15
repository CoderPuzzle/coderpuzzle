# Maximum Number of Subsequences After One Inserting

## Description

You are given a string s consisting of uppercase English letters.

You are allowed to insert at most one uppercase English letter at any
position (including the beginning or end) of the string.

Return the maximum number of "LCT" subsequences that can be formed in the
resulting string after at most one insertion.

### Example 1

```text
Input: s = "LMCT"
Output: 2
Explanation: We can insert a "L" at the beginning of the string s to make
"LLMCT", which has 2 subsequences, at indices [0, 3, 4] and [1, 3, 4].
```

### Example 2

```text
Input: s = "LCCT"
Output: 4
Explanation: We can insert a "L" at the beginning of the string s to make
"LLCCT", which has 4 subsequences, at indices [0, 2, 4], [0, 3, 4],
[1, 2, 4] and [1, 3, 4].
```

### Example 3

```text
Input: s = "L"
Output: 0
Explanation: Since it is not possible to obtain the subsequence "LCT" by
inserting a single letter, the result is 0.
```

### Constraints

- `1 <= s.length <= 10⁵`
- s consists of uppercase English letters.

## Hints

### Hint 1

Precompute preL, preLC, sufT, and sufCT arrays to count L’s, LC’s, T’s, and CT’s at each position.

### Hint 2

Compute base as the sum over all i of preLC[i] * sufT[i].

### Hint 3

For each insert position i, compute gains sufCT[i] for ‘L’, preL[i] * sufT[i] for ‘C’, and preLC[i] for ‘T’, and take the maximum of base and base + gain.
