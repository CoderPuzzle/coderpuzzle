# Solutions — Minimum Array Length After Pair Removals

## Mode count with an upper-bound and construction argument

Maximizing the number of operations minimizes what is left, so count the
maximum number of removable pairs. Each operation removes two elements
of _different_ values, which caps it two ways at once: a pair spends two
elements, so there are at most `floor(n / 2)` operations; and any fixed
value loses at most one copy per operation, so if `m` is the
multiplicity of the most frequent value, at least `m - (n - m)`
unpaired copies of it must survive — no schedule beats `min(floor(n /
2), n - m)` operations.

That bound is tight. Repeatedly remove one element from the currently
largest value group and one element from some other group; the two come
from different groups, hence different values, so every step is a legal
operation. The process can only stop when one group remains or fewer
than two elements do, and as long as several groups survive, always
draining the largest one first guarantees that no group can outlast the
initially largest one: every rival group loses elements at least as
fast. What survives is exactly `max(n mod 2, 2 * m - n)` elements.

Because nums is sorted in non-decreasing order, `m` is simply the
longest run of equal values, found in one scan with two running
counters, and the answer `n - 2 * min(floor(n / 2), n - m)` evaluates to
`max(n mod 2, 2 * m - n)`. All quantities involved (`n`, `m`, and the
difference) stay far inside signed 32-bit range for the given
constraints.

**Complexity:** `O(n)` time, `O(1)` space.
