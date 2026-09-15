# Solutions — Change Minimum Characters to Satisfy One of Three Conditions

An operation retargets one character anywhere in either string, so where a
character sits never matters — only how many characters each letter of the
alphabet contributes. Each condition then collapses to a single choice:
conditions 1 and 2 draw a boundary between two letters of the alphabet and
pay for every character on the wrong side of it, and condition 3 picks one
letter for both strings to collapse onto. Counting both strings into 26
slots turns the whole problem into 26 unify candidates plus 25 boundaries.

## Letter counts and one boundary sweep

Condition 3 is a direct scan: unifying on letter `c` costs every character
of `a` that is not already `c` plus every character of `b` that is not,
so the best `c` is a single pass over the two count arrays. Conditions 1
and 2 share one sweep. Fix the boundary `c`: give `a` the letters at or
below `c` and `b` the letters above it, and condition 1 costs the letters
of `a` above `c` plus the letters of `b` at or below it — condition 2 is
the same sum with the strings swapped. Walking `c` from `'a'` upward while
carrying running below/above totals prices every boundary in constant
time, both orientations at once, and the answer is the minimum over all
of these candidates.

The sweep ends at `'y'`, and the cutoff is forced, not cosmetic. A
boundary after `'z'` would demand that the upper string hold only letters
above `'z'`, which do not exist, so `'z'` can never serve as the lower
string's ceiling — dually, no boundary can start before `'a'`. That is
exactly the trap the second hint warns about: sweeping all 26 letters
silently prices an impossible plan, and a string whose letters already
sit at `'z'` must pay to come down rather than hoping to push the other
string above them.

**Complexity:** `O(n + m + 26)` time, `O(1)` extra space.
