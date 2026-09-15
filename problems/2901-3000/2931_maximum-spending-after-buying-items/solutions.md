# Solutions — Maximum Spending After Buying Items

The buying rule makes each shop behave like a deck dealt from the cheap
end: because every row is non-increasing, the cheapest item a shop still
offers is always its rightmost unbought one, and buying it exposes only
the next item up. So the whole schedule is a sequence of "which shop's
tail do I take today" choices, and the price multiplier grows with the
day — expensive days must be reserved for expensive items.

## Buy the cheapest tail each day

Every item must be bought on some day 1..m·n, so maximizing spending means
pairing large values with large day numbers. The greedy pairing is
optimal by an exchange argument: in any schedule, if a cheaper item was
bought on a later day than a more expensive one, swapping those two days'
purchases is still legal (each shop's tail discipline is unaffected by
when the other shop bought) and changes the total by
`(expensive − cheap) × (later − earlier) ≥ 0`. Repeating the swap untangles
any schedule into the sorted one. Feasibility comes free: the globally
cheapest unbought item is always some shop's rightmost item, since within
a shop values only shrink toward the tail.

The simulation walks days 1..m·n, each time taking the minimum of the m
current tails, crediting `value × day`, and advancing that shop's tail. A
min-heap over the shops does each step in O(log m) — with m ≤ 10 even a
plain scan over the tails is equivalent, which the JavaScript and
TypeScript versions use. The total is bounded by
10⁶ × (10⁵)(10⁵ + 1)/2 = 5.00005 × 10¹⁵, which needs 64-bit accumulators
in the typed languages and stays below 2⁵³, so JavaScript numbers remain
exact.

**Complexity:** `O(m · n · log m)` time, `O(m)` space.
