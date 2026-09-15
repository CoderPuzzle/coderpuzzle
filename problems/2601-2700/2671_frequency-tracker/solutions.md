# Solutions — Frequency Tracker

## Two hash maps kept in lockstep

The trap in this design is answering a frequency question from scratch: rescanning every stored number to see whether any occurs exactly `frequency` times costs `O(n)` per query and degrades badly once deletes start reshaping the population. The way out is to track frequency itself as first-class state: one map counts copies per number (`count_of`), and a second map counts how many distinct numbers currently sit at each frequency level (`numbers_at`).

Every operation then moves exactly one number between two adjacent buckets. `add` takes its number out of bucket `count` (when it occupied one) and into bucket `count + 1`; `deleteOne` ignores absent numbers entirely — the statement requires nothing be deleted in that case — and otherwise walks its number down from bucket `count` to `count - 1`. Buckets that fall to zero linger as harmless zero entries because `hasFrequency` only treats strictly positive membership as a hit.

With both maps maintained in this way, `hasFrequency(frequency)` collapses to a single lookup returning `numbers_at[frequency] > 0`, so all three operations run in constant amortized time. Counts only ever climb to the total number of live additions, so plain integer keys and values suffice everywhere.

**Complexity:** `O(1)` time per operation, `O(n)` space over `n` operations.
