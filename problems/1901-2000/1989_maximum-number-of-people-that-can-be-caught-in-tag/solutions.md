# Solutions — Maximum Number of People That Can Be Caught in Tag

## Two-pointer greedy over the "it" and "not it" positions

Every "it" person's catch range is an interval of equal width centered on their
index, and each person is caught at most once, so the problem is a maximum
matching between "it" intervals and "not it" points. Scanning both position
lists from left to right, the greedy that pairs the leftmost "it" person with
the leftmost still-uncaught "not it" person inside its range is optimal:
picking anyone earlier is impossible (every earlier person is out of range or
already caught), and picking a later person instead would only leave the
remaining "it" people a harder set of targets.

The code collects the positions of both teams into sorted lists, then advances
two pointers. When the current "not it" person lies to the left of the current
"it" person's reach, they can never be caught — every later "it" person is even
further right — so the "not it" pointer moves on. When the person lies beyond
the right end of the reach, the current "it" person cannot catch anyone among
the remaining uncaught people, so the "it" pointer moves on. Otherwise the pair
is matched, the count grows, and both pointers advance.

Only the two position lists are stored, each at most as long as `team`, and the
pointer loop visits each position once.

**Complexity:** `O(n)` time, `O(n)` space.
