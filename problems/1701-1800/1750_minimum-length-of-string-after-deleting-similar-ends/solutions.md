# Solutions — Minimum Length of String After Deleting Similar Ends

While the two ends of the string carry the same character, every legal
move amounts to the same thing: strip the maximal run of that
character from the left end and the maximal run from the right end at
once. Nothing is gained by stripping shorter pieces — the operation
can be repeated, and the surrounding ends only become deletable after
the whole run is gone. So the process is fully forced: peel equal-end
runs until the end characters differ or too little remains.

## Two-pointer run consumption

Walk two pointers inward. While they have not crossed and the end
characters match, advance the left pointer over every copy of that
character and retreat the right pointer over every copy — one
operation's worth per character on each side, consuming the full runs.
When the loop stops, three cases remain: the pointers crossed (both
sides consumed into an all-same remnant — length 0), they met exactly
(a single undeletable character — length 1), or they rest on different
characters (nothing more is deletable — their span is the answer).

On `"cabaabac"` the runs peel c, a, b, then a again, leaving the
pointers crossed and the string empty. On `"aabccabba"` the a-runs and
b-runs go, leaving `"cca"` with ends `c` and `a` — different, so 3
survive. On `"ca"` the ends differ immediately and both characters
stay. Each pointer moves only inward, so the walk is linear.

**Complexity:** `O(n)` time, `O(1)` extra space.
