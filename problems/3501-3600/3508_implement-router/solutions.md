# Solutions — Implement Router

## FIFO Queue with Per-Destination Timestamp Logs

The router's state is three parallel views of the same packets: the FIFO
queue itself, a membership set of the packets currently stored (duplicate
detection), and one append-only timestamp log per destination (range
counting). `addPacket` inserts into all three after the duplicate check, and
an eviction or a forwarding removes exactly one packet from the front of the
queue and from its two indexes.

The logs never need sorting: `addPacket` timestamps arrive in non-decreasing
order, so each destination's list is sorted for free, and `getCount` is two
binary searches — the count of entries in `[startTime, endTime]` is
`upperBound(endTime) - lowerBound(startTime)`.

The remaining trap is deletion. Removing a packet from the middle of a list
costs a shift, but packets only ever leave as the _oldest overall_, which in
its destination's log is the first live entry — live entries are always a
contiguous suffix. So instead of deleting, each destination carries a `head`
index that advances by one whenever its oldest packet leaves. The logs grow
to at most the number of adds, and every operation stays a handful of
constant-time touches plus one binary search.

Both the Python and Java canonical solutions implement exactly this scheme.
The Python one keys the stored-set on `(source, destination, timestamp)`
tuples and binary-searches with `lo=head`; the Java one nests a timestamp set
under the packed `(source, destination)` pair (long key) and hand-rolls the
two bounds over `[head, size)`.

**Complexity:** `O(1)` amortized per `addPacket`/`forwardPacket`, `O(log n)`
per `getCount`, `O(a)` space where `a` is the number of added packets.
