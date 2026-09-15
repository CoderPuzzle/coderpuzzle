# Solutions — Shortest Way to Form String

## Greedy repeated passes through source

The target is built one full pass through `source` at a time. Each pass walks
`source` left to right and greedily consumes the next unmatched character of
`target` whenever the current `source` character equals it — a fresh subsequence
is exactly one such pass, so counting completed passes counts the subsequences
used.

A pass that advances the `target` pointer by zero characters means the pass's
scan of every character in `source` found not a single match for the next
required character — that character never occurs anywhere in `source`, so the
task is impossible and the answer is `-1`. Otherwise the pointer into `target`
strictly advances every pass, so the loop always terminates, and the pass count
when the pointer reaches the end of `target` is the minimum number of
subsequences: greedily grabbing every matchable character in a single pass can
never require more passes than any other matching strategy, since skipping an
available match only defers it to a later pass without shortening any other.

Each pass rescans all of `source`, and `target` gains at least one matched
character per pass, so the total work across all passes is bounded by scanning
`source` once for every character consumed from `target`.

**Complexity:** `O(n * m)` time, `O(1)` space, where `n = source.length` and
`m = target.length`.
