# Solutions — Minimum Distance Between Three Equal Elements I

## Two most recent occurrences per value

The distance formula treats its three indices symmetrically, so a good tuple
can always be read in sorted index order a < b < c, where it collapses to
(b - a) + (c - b) + (c - a) = 2 * (c - a). Only the outermost indices matter:
the middle one cancels out. Minimizing the distance therefore means finding
three equal values whose outermost indices span as little ground as possible.

For any fixed value, that tightest triple uses three **consecutive**
occurrences of it in index order. Suppose occurrences p < q < r are not
adjacent in the value's occurrence list — then some occurrence q' sits between
p and q, and (p, q', r) has the same right end but a narrower or equal span,
so the wider choice never wins. This gives a single left-to-right sweep: keep,
per value, the two most recent indices where it appeared. When the value shows
up again at index i with those stored at a <= b, the candidate distance is
2 * (i - a), and the pair slides forward to (b, i). Older occurrences can only
widen the span, so discarding them loses nothing.

The per-value memory is a hash map from value to its last two indices — at
most n entries. The answer starts as the -1 sentinel and is lowered by every
candidate found; the arithmetic stays tiny (n <= 100 caps the distance at
2 * 99 = 198), so everything fits comfortably in 32-bit signed integers across
all languages.

**Complexity:** `O(n)` time, `O(n)` space.
