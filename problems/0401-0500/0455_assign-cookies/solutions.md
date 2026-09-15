# Solutions — Assign Cookies

## Sort both, feed the least greedy first

Sort the greed factors and the cookie sizes ascending, then walk the cookies
with a pointer into the children. The least greedy unfed child is the easiest
to satisfy and the smallest unassigned cookie is the cheapest one that might
satisfy anyone, so the pairing to try first is exactly those two: whenever the
current cookie is at least the current child's greed, hand it over and advance
the child; a cookie smaller than that greed is smaller than every remaining
child's greed too, so it can be discarded outright. The child pointer at the
end of the scan is the answer.

Giving away the smallest sufficient cookie is safe by an exchange argument.
Take any optimal assignment and look at the least greedy child. If the optimum
feeds that child some cookie, every other cookie large enough for the child is
at least as large as the greedy choice, so swapping the two — small cookie to
the least greedy child, the displaced larger cookie to whoever had the small
one — keeps everyone content: a child that could be satisfied by the small
cookie can be satisfied by the larger one, but not vice versa. Saving bigger
cookies for greedier children therefore never helps, and if the optimum leaves
the least greedy child un-fed while its smallest sufficient cookie goes to a
greedier child (or to nobody), moving that cookie to the least greedy child
changes nothing. Repeating the argument down the sorted order shows the greedy
scan is optimal.

The mechanics stay inside comparisons, so the `2³¹ - 1` value ceiling is never
a hazard — no sums are formed, in any language. An empty `s` never enters the
loop and returns 0, and unsorted inputs are made sorted first, which is what
makes the "too small for everyone remaining" discard valid.

**Complexity:** `O(n log n + m log m)` time, `O(1)` extra space beyond the sorts.
