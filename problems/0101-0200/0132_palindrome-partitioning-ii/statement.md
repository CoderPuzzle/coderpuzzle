# Palindrome Partitioning II

## Description

Given a string `s`, partition `s` such that every substring of the partition
is a palindrome.

Return the minimum cuts needed for a palindrome partitioning of `s`.

### Example 1

```text
Input: s = "aab"
Output: 1
Explanation: The palindrome partitioning ["aa","b"] could be produced using 1 cut.
```

### Example 2

```text
Input: s = "a"
Output: 0
```

### Example 3

```text
Input: s = "ab"
Output: 1
```

### Constraints

- `1 <= s.length <= 2000`
- `s` consists of lowercase English letters only.

### Follow-up

Can you solve it in O(n²) time and O(n) extra space, without a full
palindrome table?

## Hints

### Hint 1

Let `cut[i]` be the minimum cuts for the prefix of length `i`; the answer is
`cut[n]`. A partition's last piece is some palindrome `s[j..i-1]`, so
`cut[i] = min(cut[j] + 1)` over all `j` where that suffix piece is a
palindrome.

### Hint 2

Precomputing an `is_palindrome[l][r]` table costs O(n²) time but O(n²) memory.
You can avoid it: enumerate every palindrome center and expand outward — each
expansion step yields one palindrome `s[l..r]` for free, updating
`cut[r+1] = min(cut[r+1], cut[l] + 1)`.

### Hint 3

Seed `cut[0] = -1` so that a prefix which is itself a palindrome needs zero
cuts, and initialize `cut[i] = i - 1` (single characters) before relaxing.
