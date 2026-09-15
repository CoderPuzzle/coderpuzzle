# Solutions — Positions of Large Groups

The string is nothing but a sequence of maximal runs, one per stretch of a
repeated character, and the answer is simply those runs of length three or
more reported as `[start, end]` index intervals. Nothing needs to be searched
for or compared across distances — each run is decided the moment it ends, and
the runs already appear in increasing order of start index.

## One scan, close each run as it ends

The scan carries a single number besides the output: `start`, the index where
the run currently in progress began. At position `i`, either `s[i]` continues
the run (`s[i] == s[i-1]`) and nothing happens, or the run has just ended at
`i - 1`. An ended run spans `[start, i - 1]`, so its length is `i - start`;
when that is at least 3 the interval is appended, and `start` resets to `i`
for the run about to begin.

The final run has no following character to change and end it, so the loop is
driven to `i = n` and treats running off the end as one more change: the same
test fires with `i = n`, closing the last run at `[start, n - 1]`. The
threshold does the rest — runs of length 1 and 2 (the `"a"`, `"bb"`, `"z"`,
`"yy"` of the example) fail `i - start >= 3` and are skipped, while `"xxxx"`
passes and yields `[3,6]`. Because runs end strictly left to right, the
intervals are appended already sorted by start, which is exactly the order the
statement demands.

**Complexity:** `O(n)` time, `O(n)` space.
