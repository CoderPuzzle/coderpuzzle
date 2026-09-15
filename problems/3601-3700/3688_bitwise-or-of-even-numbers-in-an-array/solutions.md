# Solutions — Bitwise OR of Even Numbers in an Array

## One pass with a running fold

The parity test is a single bit inspection, so nothing beats walking the
array once and folding every even value into a running accumulator: start
from `0`, and for each element that survives `value % 2 == 0`, OR it into
the accumulator. When the scan ends, the accumulator is exactly the bitwise
OR of all even elements.

Starting from `0` is not just convenient — it is what pins the empty case.
`0` is the identity of OR (`x | 0 == x`), so an array with no even numbers
never touches the accumulator and the method returns `0`, precisely the
value the statement demands. The same identity makes odd values harmless to
skip rather than special-case: they contribute nothing to any even-only OR,
and duplicates collapse naturally because OR is idempotent
(`x | x == x`).

The answer can never exceed the largest input value's bit width — here the
bound `nums[i] <= 100` keeps every result under `128` — so plain machine
integers suffice in every language and no wide-arithmetic care is needed.
Each element is examined once and each fold step is constant time.

**Complexity:** `O(n)` time, `O(1)` space.
