# Solutions — Minimum Number of Steps to Make Two Strings Anagram II

## Sum the absolute frequency differences

Only letter counts matter, never positions. Count each letter's
frequency in `s` and subtract its frequency in `t`: the absolute value
per letter is exactly how many copies of it are unmatched on one side,
and each unmatched copy costs one append to the other string. The answer
is the sum of those 26 absolutes.

**Complexity:** `O(|s| + |t|)` time, `O(26)` space.
