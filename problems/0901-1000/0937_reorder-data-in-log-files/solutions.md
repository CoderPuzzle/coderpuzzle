# Solutions — Reorder Data in Log Files

The order the answer must carry is three rules at once: every letter-log
before every digit-log, letter-logs ordered lexicographically by (content,
identifier), and digit-logs kept in their input order. Every approach
therefore opens with the same pass — split each log at its first space into
identifier and content, and classify it by the content's first character,
a digit meaning digit-log — because once the two kinds are partitioned, two
of the three rules hold by construction.

## Partition, Then Sort the Letter-Logs

One sweep partitions `logs` into a letter list and a digit list. The digit
list is built in input order, so its rule is satisfied the moment the pass
ends and nothing ever sorts it again; only the letter list is sorted, under
the comparator that compares contents first and identifiers second.

That comparator is a total order: two letter-logs with equal content and
equal identifier are identical strings, so no pair is left for sort
stability to decide — and the digit-logs are not sorted at all, so no
engine's stability guarantees are ever relied on. Concatenating the sorted
letter list with the digit list emits the answer.

**Complexity:** `O(n log n · L)` time, `O(n)` space.
