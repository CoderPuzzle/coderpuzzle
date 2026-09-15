# Solutions — Minimum Number of Keypresses

## Greedy frequency sort

Every letter contributes to the total once per occurrence, so the only
freedom is which press count each letter pays. The nine buttons give nine
slots that cost 1 press per character, nine that cost 2, and eight that cost
3, and the statement's "at most 3 characters" rule means the slot totals are
exactly that. To minimize `sum count * pressCost` the most frequent letters
must take the cheapest slots, so the method counts each of the 26 letters,
sorts the counts in non-increasing order, and lets the k-th most frequent
letter (0-indexed) pay `k / 9 + 1` presses.

The rank-to-cost mapping falls straight out of the layout: ranks 0-8 land on
the nine 1-press slots, ranks 9-17 on the nine 2-press slots, and ranks
18-25 on the remaining eight 3-press slots. Letters that never appear in the
string have count zero and contribute nothing to the sum regardless of where
they are placed, which is why only the present letters need sorting.

A greedy assignment is optimal here because the two sequences — counts
descending and slot costs ascending — are both sorted, so the rearrangement
inequality applies: pairing the largest count with the smallest cost is
globally optimal, and no exchange can improve the total.

**Complexity:** `O(n + 26 log 26)` time, `O(1)` space.
