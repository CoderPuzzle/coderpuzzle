# Solutions — Maximum Balanced Shipments

## Greedy running maximum

A shipment can only be balanced at an index whose parcel is strictly lighter
than some earlier parcel of its run — that is, strictly lighter than the
run's maximum. So sweep the parcels once, carrying the heaviest weight seen
since the current segment opened, and close a balanced shipment at the first
parcel that dips strictly below it. Everything between two closes is one
segment; parcels left after the last close simply stay unshipped.

Closing as early as possible never costs a shipment. Any valid selection's
first balanced run ends at an index whose parcel sits below the prefix
maximum up to there — the same condition greedy closes on, no later than
that end. Replacing the run with one ending exactly at greedy's close keeps
it balanced (the greater anchor is still inside) and disjoint from the rest
of the selection, while freeing more parcels to its right. Repeating the
argument on what remains shows greedy matches any selection, so the count is
optimal.

Mechanically: keep `segment_max` for the open segment and reset it to empty
after every close, so the next parcel starts a fresh segment. A parcel equal
to the current maximum does not qualify — the comparison is strict — and
just leaves the maximum where it was. The answer is the number of closes.

**Complexity:** `O(n)` time, `O(1)` space.
