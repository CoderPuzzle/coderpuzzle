# Solutions — Word Squares II

## Corner-keyed enumeration of ordered word quadruples

The four corner constraints only ever compare first and last letters:
`top[0] == left[0]`, `top[3] == right[0]`, `bottom[0] == left[3]`, and
`bottom[3] == right[3]`. So the search never needs to look at a word's
middle letters — it needs, for every letter, the words starting with it
and the words ending with it. Two small buckets per letter (`by_first`,
`by_last`) turn each role choice into a short scan over like-minded words.

The roles are filled in dependency order. Pick `top` (outermost, in sorted
order); `left` must start with `top`'s first letter; `right` must start
with `top`'s last letter; `bottom` must end with `right`'s last letter and
start with `left`'s last letter. Distinctness is enforced by skipping any
candidate equal to an already-picked word. Every surviving quadruple is a
valid square by construction — all four constraints were checked as the
roles were chosen — so the loop appends it directly.

The result is sorted at the end by the full `(top, left, right, bottom)`
tuple to match the required output order. The work is combinatorial but
tightly bounded: at most 15 words means at most `15 · 14 · 14 · 13`
ordered quadruples before pruning, and the bucket scans only visit words
whose relevant corner letter already matches, which prunes far earlier.
With n ≤ 15 the recursion-free quadruple nesting stays at a fixed depth of
four loops, well inside every runtime's limits.

**Complexity:** `O(n⁴)` time for `n = words.length` (in practice far less,
since bucket scans prune on corner letters), `O(n)` auxiliary space plus
the output.
