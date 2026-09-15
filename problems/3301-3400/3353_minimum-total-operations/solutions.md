# Solutions — Minimum Total Operations

## One operation per broken boundary

Adding `k` to a prefix of length `L` shifts every element before position
`L` equally, so among adjacent differences `nums[i] - nums[i - 1]` it
touches exactly one: the difference straddling the prefix's end, which
changes by `-k`. A prefix covering the whole array shifts everything
equally and can never help — the last element never needs to move — and an
operation aimed at boundary `L` with `k` equal to that boundary's
difference resets it to zero without disturbing any other boundary.

That gives both bounds at once. Every operation repairs at most one
boundary, so at least one operation is needed per adjacent pair that
differs; and picking `k` as each differing boundary's value in turn
repairs exactly those, so the count of unequal adjacent pairs is
achievable. The answer is a single scan counting positions where
`nums[i] != nums[i - 1]` — no arithmetic beyond the comparison, and the
count is below `n`, far inside 32 bits.

**Complexity:** `O(n)` time, `O(1)` space, where `n = nums.length`.
