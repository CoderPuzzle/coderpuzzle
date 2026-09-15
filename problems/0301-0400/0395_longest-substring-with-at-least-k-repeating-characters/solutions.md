# Solutions — Longest Substring with At Least K Repeating Characters

Both solutions buy tractability from the same corner. The rule "every
present letter reaches `k`" moves in neither direction with window size —
extending can drag in a fresh letter sitting below `k`, shrinking can starve
one that had arrived — so the condition resists greedy scans and a lone
sliding window alike. The 26-letter alphabet is the way out. The divide and
conquer eliminates at least one letter per recursion level, so at most 26
levels ever run. The sliding window pins the letter variety itself: a valid
window holds between 1 and 26 distinct letters, and with that count fixed as
a budget the rule becomes one two pointers can maintain.

## Divide and conquer on rare characters

A character that occurs fewer than `k` times inside a stretch of text can never be part of a valid substring of that stretch — its count cannot rise by shortening the substring. Every occurrence of such a rare character is therefore a hard splitter: valid substrings must live entirely between consecutive rare characters. This turns the problem into divide and conquer: count all characters in the current piece, and if none is rare the whole piece is valid and its length is returned; otherwise split the piece at every occurrence of every rare character and recurse on the non-empty pieces.

Two facts make this efficient rather than exponential. First, the pieces at each level are disjoint, so the total counting work per level is linear in the original string length. Second, every recursion level eliminates at least one character from the alphabet of its pieces — all occurrences of the rare characters were split on, so no piece contains them — which bounds the depth by the 26-letter alphabet. The base case (empty piece) returns 0, and the answer for a piece is the maximum over its children.

Edge cases fall out directly: if `k` exceeds the string length then every character is rare, the pieces collapse to nothing, and 0 is returned; a string where all characters already meet the threshold returns its full length immediately at the top level; and pieces consisting of a single repeated character (like "aaa" with `k = 3`) are accepted by the no-rare-character check without further splitting.

**Complexity:** `O(26·n)` time, `O(n)` space.

## Sliding Window over Distinct-Letter Budgets

A qualifying window is pinned down by two counts: how many distinct letters
it holds, and how many of those have reached `k`. The first count is a
handle the divide and conquer leaves free — and it ranges over just 26
values. Fix it as a budget `t` and the question shrinks to: the longest
window holding at most `t` distinct letters, each at count `k` or more.

With `t` pinned, the window rule becomes directional. Extending a window to
the right can only add letters, never remove them, so its letter variety
never falls: once a window holds more than `t` distinct letters, no further
extension repairs it and only shrinking from the left can. That is the shape
a two-pointer sweep needs. The right edge walks the string once; whenever
the variety busts the budget, the left edge advances — dropping letters
until the window is legal again — and never backtracks. Alongside the
counts, the sweep tracks `qualified`, the number of letters whose in-window
count has reached `k`, and records a length when `qualified` hits `t`:
`qualified` can never exceed the variety, and the variety never exceeds the
budget, so reaching `t` means exactly `t` letters are present and every one
of them has arrived at `k` — the definition, verbatim. A letter rarer than
`k` across the whole string simply never joins `qualified`; windows leaning
on it are never recorded, and no special casing is needed.

The optimum cannot slip through. Take any valid substring with `d` distinct
letters and run the budget `t = d`: when the right edge reaches its last
position, the window is the longest one ending there with at most `d`
varieties, so it contains that substring — which already supplies `d`
distinct letters — and cannot exceed `d` either. The window therefore holds
exactly the same `d` letters, at counts at least as large, and records a
length at least as long. Recording only ever fires on windows that satisfy
the definition, so the maximum is exact.

**Complexity:** `O(26n)` time, `O(26)` space.
