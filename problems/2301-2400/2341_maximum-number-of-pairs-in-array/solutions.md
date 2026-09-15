# Solutions — Maximum Number of Pairs in Array

## Count frequencies and pair each value up

A value contributes nothing but its multiplicity: from `c` copies of one
integer we can form `c // 2` pairs, and if `c` is odd exactly one copy is
left over. Choices during the operation never interact across values, since
a pair needs two equal integers, so the answer is just the sum of these
per-value results.

Count the frequency of every number in `nums`, then return the total of
`count // 2` over all values as `answer[0]` and the total of `count % 2` as
`answer[1]`. The operation can always reach this maximum by pairing off any
two equal remaining numbers until no value has two copies left.

**Complexity:** `O(n)` time, `O(n)` space.
