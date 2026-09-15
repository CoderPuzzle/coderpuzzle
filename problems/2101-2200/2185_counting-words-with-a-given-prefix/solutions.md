# Solutions — Counting Words With a Given Prefix

## Scan and compare leading characters

Each word either starts with `pref` or it does not; a single pass that
tests the first `len(pref)` characters of every word counts the matches.
Nothing smarter than a scan pays at these bounds (`100` words of `100`
characters).

**Complexity:** `O(total words * pref length)` time, `O(1)` space.
