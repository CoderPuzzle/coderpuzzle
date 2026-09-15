# Solutions — Faulty Sensor

A defective sensor does something very specific to its readout: it agrees
with the truth up to the dropped data point, and from there on it matches
the truth shifted one place to the left, with an arbitrary value parked in
the final slot. That structure — a common prefix, then a shifted suffix —
is all the identification needs.

## Two candidacy scans

For each sensor in turn, test whether its array could be the other array
with one element dropped: skip the common prefix where the two readings
still agree, then require `a[i] == b[i + 1]` for the rest of the scan,
stopping one short of the end — the last position holds the random
replacement and is never compared. Exactly one successful scan names the
defective sensor.

When both scans succeed the situation is symmetric — either the readings
are identical, so no defect occurred, or, as in the second example,
dropping the final data point of either array reproduces the other, so the
evidence cannot distinguish them. Both paths return `-1`, as does the
impossible both-fail case, keeping the decision down to comparing the two
booleans.

**Complexity:** `O(n)` time, `O(1)` extra space, where `n` is the length
of `sensor1`.
