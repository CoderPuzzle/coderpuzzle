# Solutions — Group the People Given the Group Size They Belong To

## Bucket by required size, cut every full bucket into groups

Two people can share a group only when their `groupSizes` entries are
equal, so the array partitions naturally by that value: bucket every
person id under its required size, then slice each bucket into consecutive
chunks of exactly that size. A bucket of `k` ids whose size is `s`
contains a multiple of `s` entries (the input guarantees a valid
grouping), so the chunks come out even and no id is left over. Each chunk
is one answer group; the order of groups and the order inside a group are
both free, and this pass emits them in first-encounter order.

The alternative formulation keeps one open group per size and closes it as
soon as it reaches capacity ("greedy fill until you need a new group"),
which produces identical structure — the two differ only in whether the
bucket is materialized or streamed. At `n <= 500` there is nothing to
choose between them on time; the explicit bucket version reads more
directly.

**Complexity:** `O(n)` time to bucket and slice all `n` people;
`O(n)` space for the buckets and the output.
