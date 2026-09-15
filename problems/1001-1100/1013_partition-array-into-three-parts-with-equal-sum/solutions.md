# Solutions — Partition Array Into Three Parts With Equal Sum

If the array splits into three equal-sum parts, the total must be a
multiple of three, and each part's sum must equal `total / 3`; that
target is fixed before any split point is chosen, which turns the
problem into finding two prefix boundaries that each land on it.

## Prefix scan for two target-sum boundaries

If `sum(arr) % 3 != 0`, no equal three-way split can exist, so return
false immediately. Otherwise let `target = sum(arr) / 3` and walk the
array while accumulating a running sum. Every time that running sum
hits `target` exactly, a completed part has been found: count it and
reset the running sum to zero so the next part starts accumulating
fresh from the next element.

The scan stops before the last index rather than running to the end of
the array. This is what keeps the third part non-empty: as soon as the
running sum hits `target` for the second time, at least one element
still remains unscanned to form the third part, and — because the
total is exactly `3 * target` — whatever is left over is guaranteed to
sum to `target` too, so it never needs to be scanned explicitly. Return
true the moment the second hit occurs; if the scan reaches the
second-to-last index without two hits, return false.

This handles `target == 0` the same way as any other target: a run of
zero-sum boundaries is not special-cased, because only the _first two_
hits before the last index matter — extra zero-crossings past that
point are simply never reached, since the function returns as soon as
the count reaches two.

**Complexity:** `O(n)` time, `O(1)` extra space, where `n` is the
length of `arr`.
