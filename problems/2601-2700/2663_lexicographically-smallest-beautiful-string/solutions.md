# Solutions — Lexicographically Smallest Beautiful String

## Right-to-left greedy bump with blocking distance fill

Only palindromes of length 2 and 3 can ever appear: a longer palindrome has a
shorter one nested around its center (hint 1), so a string is beautiful
precisely when no two equal letters sit adjacent or with one letter between.
That collapses "is this extension safe" into a constant check — a new
character is forbidden only by up to two remembered neighbors.

To get the smallest beautiful successor we bump exactly one position. Scanning
from the right, find the first index where some larger letter fits without
colliding with its previous two characters; leaving everything left of that
index untouched is required for minimality, because any answer smaller than
ours would have to agree with `s` on an even longer prefix. The bumped letter
itself is chosen as small as possible for the same reason. Positions right of
the pivot are then rebuilt by repeatedly taking the smallest letter that does
not match either blocker; since `k >= 4`, some letter always exists among the
first three tried, so the suffix settles into an `abc`-cyclic pattern. If no
position can be bumped, `s` is already maximal and the answer is empty.
The whole pass touches each position once behind O(1) work.

**Complexity:** `O(n)` time (`k <= 26` bounds each inner scan), `O(n)` space
for the character buffer.
