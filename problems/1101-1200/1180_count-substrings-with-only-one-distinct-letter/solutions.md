# Solutions — Count Substrings with Only One Distinct Letter

## Run-Length Accumulation

A substring made of one distinct letter lives entirely inside a maximal
run of equal characters — it can never cross a boundary where the letter
changes. So the runs partition the problem: a run of length `L` contains
`L + (L−1) + ... + 1 = L(L+1)/2` uniform substrings, one for each choice of
start and end inside the run.

The single scan computes that sum without ever materializing run lengths:
keep a counter for the length of the current run ending at position `i`.
When `s[i]` equals `s[i−1]` the counter grows; otherwise it resets to 1.
Adding the counter to the answer at every step does the arithmetic — after
processing a whole run of length `L`, the additions have contributed
exactly `L(L+1)/2`. The maximum answer, 500500 for 1000 equal letters,
sits comfortably in 32 bits.

**Complexity:** `O(n)` time for one pass over the string, `O(1)` extra
space.
