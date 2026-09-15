# Solutions — Satisfiability of Equality Equations

Equality propagates and inequality forbids: an assignment of integers to
the one-letter variables satisfies every equation exactly when the two
sides of each '!=' pair take different values while the sides of each
'==' pair take the same one. The '==' relations alone never conflict —
any chain can be honored with one shared value — so the question reduces
to whether some '!=' pair ends up inside a single equality-connected
class of the 26 letters, which a tiny union-find over the alphabet
answers.

## Union First, Judge After

The letters are indexed to 0-25 and each starts as its own class in a
26-slot parent array. Pass one walks the equations and unions both sides
of every '==' pair; find is iterative — chase parent links to the root,
then point every letter visited straight at it (path compression) — so
no recursion exists to overflow and later finds run nearly flat. After
this pass each class is exactly the set of letters some chain of '=='
has tied together, whatever order the equations arrived in.

The two passes cannot be merged, and the order is the whole trap: a
solver judging each '!=' the moment it meets it fails on
`["b!=a","a==b"]`, because when the inequality is read nothing yet ties
b to a, and the later union silently buries the conflict. Unioning all
equalities first makes every class final before any disequality is
judged, so the verdict does not depend on equation order. Pass two then
re-reads the list and fails exactly when some '!=' has both sides in
one class — such a pair demands two different values from letters
obliged to share one.

**Complexity:** `O(n * alpha(26))` time, `O(1)` space (26 letters).
