# Solutions — Minimum Operations to Make a Special Number

## Buy back the whole prefix behind one valid suffix pair

Divisibility by 25 depends only on a decimal number's final two
digits, so among whatever digits survive the deletions the result is
special exactly when its last two survivors read 00, 25, 50, or 75 —
or when nothing survives at all, both because an empty number and a
single kept '0' equal 0.

Fix positions i < j holding one of those four endings and treat them
as the closing pair of the answer: everything left of i may survive
for free, since leading digits never change what a number is
congruent to mod 25, while any survivor wedged between i and j or to
the right of j would break the pair, so both stretches must go. That
costs (j - i - 1) + (n - 1 - j) = n - i - 2 deletions, a number
driven down solely by pushing i rightward. Scanning, for each
ending, the rightmost slot j of its second digit and then the nearest
earlier slot of its first digit already attains the best i per
ending: any feasible first digit lies left of that j, so no candidate
is missed. The two degenerate candidates complete the picture —
keeping exactly one '0' digit costs n - 1, and clearing the string
entirely costs n — so the answer is simply the smallest of them all,
one bounded scan per ending over the input of at most 100 digits; no
intermediate ever leaves ordinary integer range.

**Complexity:** `O(n)` time, `O(1)` extra space.
