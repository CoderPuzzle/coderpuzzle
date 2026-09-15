# Solutions — Maximum Nesting Depth of Two Valid Parentheses Strings

## Balance two groups greedily

Every closing parenthesis must join the same group as its matching opener,
so the only real decision is where to put each `'('`. The goal is to keep
the two groups' nesting depths as low as possible, and the way to do that is
to always open a new parenthesis in the currently **shallower** group. If the
groups are tied, the previous `'('`'s group is reused; a group id stack
remembers, for each still-open parenthesis, which group it belongs to, so a
`')'` can be assigned by popping.

The invariant that makes this optimal is that the depth difference between
the two groups never exceeds one: adding a parenthesis to the shallower group
closes a gap of one to zero, and adding on a tie opens a gap of at most one.
So at every point each group holds either `floor(k / 2)` or `ceil(k / 2)` of
the `k` currently open parentheses, and the deeper group's depth is never
more than `ceil(D / 2)` where `D` is the maximum depth of the whole string.
That bound is exactly the minimum possible value of
`max(depth(A), depth(B))` — no split can do better, because the two groups
together must cover all `k` open parentheses of the deepest moment.

Each parenthesis is pushed or popped once, and the two group depths are just
a pair of counters, so the walk is a single linear pass with constant extra
state beyond the stack.

**Complexity:** `O(n)` time, `O(n)` space — one pass over `seq`, with the
stack holding at most the current nesting depth of open parentheses.
