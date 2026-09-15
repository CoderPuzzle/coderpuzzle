# Solutions — Unique Length-3 Palindromic Subsequences

## First and Last Occurrence per Letter

A length-3 palindrome is completely determined by its two equal outer characters and its middle character, so there are at most 26 × 26 candidate strings. More importantly, the palindrome `x y x` exists as a subsequence of `s` if and only if some `y` lies strictly between the first and last occurrence of `x`: if `y` is there, first-x, that `y`, last-x form the subsequence in order; if it is not, no occurrence of `x` has any different-strategy placement to exploit, because widening to the outermost occurrences of `x` is always the most permissive choice.

Because the problem counts each distinct palindrome once, duplicates arising from multiple occurrences of `y` (or multiple usable pairs of `x`) must be collapsed. The code therefore takes, for each letter `x`, the open interval between its first and last index and counts the distinct characters inside it via `len(set(s[first+1:last]))` — a set, not a count of positions — and sums this over the 26 letters. Letters that never appear, or whose first and last occurrences are adjacent or identical (`last - first < 2`, leaving no room for a middle), contribute nothing.

The whole algorithm is 26 passes of `find`, `rfind`, and one slice-to-set conversion, each linear in `n`, which is comfortable for `n` up to 10^5. The temporary slice and set can hold up to `n` characters, dominating the memory footprint.

**Complexity:** `O(26·n)` time, `O(n)` space.
