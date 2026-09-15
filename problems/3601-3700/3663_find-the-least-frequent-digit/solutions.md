# Solutions — Find The Least Frequent Digit

## Ten buckets, one pass

The representation holds at most ten digits, so counting needs no cleverer
structure than a fixed array: peel digits off `n` with division and modulo,
bumping bucket `n % 10` and replacing `n` with its quotient until it hits
zero. The digit itself indexes the bucket, so there is no map and no key
comparison anywhere in the counting phase.

The winner falls out of one ascending scan over the ten buckets. A bucket
only qualifies when it is non-empty — a digit that never appeared is not
part of the representation and cannot compete at frequency zero — and the
scan keeps the current best only while a qualifying count is strictly
smaller than the best seen. Because the digits are visited in increasing
order under a strict comparison, the first bucket holding the minimum
count is already the smallest tied digit: the tie-break costs nothing
extra, which is why `n = 21` answers `1` even though `2` is read first.

Both phases touch a constant-size array no matter how large `n` is, so the
work is one pass over the digits — at most ten of them — plus one scan of
ten counters.

**Complexity:** `O(log n)` time, `O(1)` space.
