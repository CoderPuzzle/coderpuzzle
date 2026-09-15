# Solutions — Count Complete Substrings

## Segment split plus one sliding window per multiple of k

The adjacency rule is a local property, so the string falls apart into
maximal segments in which every neighbouring pair differs by at most 2 —
the first pair with distance 3 or more cuts the string, and no complete
substring can span the cut. Inside one segment every window automatically
satisfies the adjacency condition, and the count condition fixes the
possible window lengths: if a window uses `m` distinct letters, each
appears exactly k times, so its length is exactly `m * k` for some
`m <= 26` — Hint 1's observation.

That leaves at most 26 window lengths to try per segment. For a fixed
length `L = m * k`, a fixed-size window slides one step at a time while a
`cnt[26]` array tracks letter frequencies and a single counter `bad`
tracks how many letters currently violate "0 or exactly k" — the window
is complete exactly when `bad == 0`. Each slide updates the entering and
leaving letter's classification in constant time: reaching k from below
or falling back to 0/k repairs a violation, entering `1..k-1` or leaving
k/0 creates one. Segments overall contribute at most 26 passes over their
letters, so the whole scan stays linear in `n` up to a constant factor.

Answer sizes stay far inside 32-bit range: at most 26 windows can end at
any position, so the total is at most `26 * n <= 2.6 * 10⁶`.

**Complexity:** `O(26 * n)` time, `O(26)` extra space.
