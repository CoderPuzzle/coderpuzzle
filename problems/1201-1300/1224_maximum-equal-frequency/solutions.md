# Solutions — Maximum Equal Frequency

## Scan prefixes, maintaining counts of counts

Process elements one at a time and, after each, ask whether the prefix seen so
far can be fixed by removing a single element. Two maps answer that in
constant time per step: `count[v]` — how many times value `v` has appeared —
and `freq[c]` — how many distinct values currently appear exactly `c` times.

A prefix is fixable exactly when one of three shapes holds, each removing one
element from one frequency class:

- every value appears once (remove any one, all remaining are 0 — also the
  only-valid answer for a single-element prefix);
- one value appears once and every other value shares some frequency `f`
  (remove the singleton);
- one value appears `f + 1` times and all others appear `f` times (remove one
  copy of the frequent value, collapsing it into the majority class).

Because the property is checked at every prefix, the last index where it
holds is the answer — the scan simply never shrinks `best`.

**Complexity:** `O(n)` time, `O(n)` space.
