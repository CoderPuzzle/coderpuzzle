# Solutions — Squares of a Sorted Array

Both approaches square the same values; they differ in where the order comes
from. The direct reading never consults the input's arrangement: square every
element in place, then let the language's sort produce it — a correct
`O(n log n)` answer that leaves the constraints' one gift unused. The gift is
real: `nums` arrives sorted, and squaring only folds the number line at zero,
so the largest remaining square always sits at one of the two ends of the
unprocessed window — never inside it. Two pointers, one at each end, can
therefore emit the answer from largest square to smallest without any sorting
pass, meeting the follow-up's `O(n)` goal.

## Square and sort

Take the statement at its word: the answer is the squares arranged in
non-decreasing order, and a sort produces that from any input at all. Each
value is squared — the sign dies in the squaring, so the negatives need no
case of their own — and the squares are handed to the language's sort.
Nothing reads the input's own arrangement: on an unsorted `nums` this code
would behave identically.

That indifference is exactly what it pays for. The sorted input already
encodes the order the answer needs, but the sort rediscovers it from
scratch, spending `O(n log n)` comparisons where a single merge of the two
magnitude runs would do. Squares stay small — magnitudes are bounded by
`10⁴`, so every square is at most `10⁸`, well inside 32-bit range — no
comparison can overflow.

**Complexity:** `O(n log n)` time, `O(n)` space.

## Two pointers from both ends

Keep a window `[left, right]` of values not yet written and fill a
preallocated answer from the back. Each step compares the squares of the two
window ends: whichever is larger is the largest square remaining anywhere —
the ends bound their half's magnitudes, since `nums` is sorted — so it is
written to the next back position and its pointer moves inward. When the
squares tie (`-3` and `3` both square to 9) either value may go first; both
get written, one now and one in a later step.

The window shrinks by exactly one value per step, so after `n` steps the
answer is full and the loop ends; every value is read a constant number of
times and written exactly once. Magnitudes are bounded by `10⁴`, so squares
stay at or below `10⁸`, comfortably inside 32-bit integers, and the squared
comparison never overflows.

Squaring into a new array and sorting it is the trivial alternative — same
output, `O(n log n)` time — but the sorted input already encodes the order
the sort would discover; the two-pointer scan reads that order off directly.

**Complexity:** `O(n)` time, `O(n)` space.
