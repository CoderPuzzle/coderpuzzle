# Solutions — Maximum Number of Occurrences of a Substring

## Only the shortest windows can win

Every qualifying substring of length `L` between `minSize` and `maxSize`
contains a prefix of length `minSize`, and that shorter prefix occurs at
every position the longer one does — so its count is greater than or equal
to the longer substring's, while it drops at most `minSize` distinct
characters from the uniqueness test. Whatever a longer window achieves, some
`minSize` window achieves at least as much. That observation collapses the
whole `minSize..maxSize` band: only windows of exactly `minSize` ever need
counting, and `maxSize` is irrelevant to the answer.

The scan slides one fixed-size window across the string. Each step adds the
entering character to a small frequency table (26 letters) and removes the
leaving one, keeping the distinct-character count current in constant time;
windows whose distinct count stays within `maxLetters` bump a hash map from
window text to occurrence count. Occurrences overlap freely — every start
position counts, which is exactly what Example 2 asks for. The answer is
the largest map value, or 0 when no window qualifies.

The map holds at most `n` entries of at most 26 characters each, well
within limits for `n <= 10^5`.

**Complexity:** `O(n * minSize)` time (each window's hash key is built once),
`O(n)` space.
