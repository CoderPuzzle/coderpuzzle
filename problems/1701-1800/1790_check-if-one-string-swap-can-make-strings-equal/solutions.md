# Solutions — Check if One String Swap Can Make Strings Equal

A swap touches exactly two positions of one string, so it can only repair
differences two at a time — never one, never three. Strings that already
agree need no swap at all, and strings that disagree in exactly two places
are fixable precisely when each position holds the character the other one
is missing.

## Scan the differing positions

Walk both strings together and record the first two indices where they
disagree; a third disagreement settles the question on the spot, since a
single swap cannot touch three positions. If the scan ends with no
recorded index the strings are equal — the "at most one" clause covers
performing no swap — and with exactly two recorded indices `i` and `j`
the repair is possible only when the characters are crossed: swapping
`s1[i]` with `s1[j]` fixes both positions exactly when `s1[i] == s2[j]`
and `s1[j] == s2[i]`.

On `("bank", "kanb")` the scan records 0 and 3, and `b`/`k` match across
the two positions, so one swap equalizes the strings; on
`("attack", "defend")` the third disagreement ends the scan with `false`.
The pass keeps two indices and nothing else.

**Complexity:** `O(n)` time, `O(1)` space, where `n` is the length of the
strings.
