# Solutions — Missing Ranges

## Linear walk over the gaps

Because `nums` arrives sorted and unique, every gap between consecutive elements is already maximal when the walk reaches it — nothing later can widen it, and nothing earlier was skipped. So one pass suffices: remember the previous value, and whenever the next value steps more than one past it, the integers strictly between the two form exactly one missing range.

The walk seeds `prev` with `lower - 1`, which turns the gap before the first element into an ordinary interior gap: if `nums[0]` sits above `lower`, the range `[lower, nums[0] - 1]` falls out of the same comparison as any other. After the loop the tail is closed by the same test against `upper` — a spread of `upper - prev >= 1` means at least one number is missing after the last element, emitted as `[prev + 1, upper]`. An empty `nums` reduces to that tail alone, so it returns the full range `[lower, upper]`.

Every element lies inside `[lower, upper]`, and the constraints bound that span at `[-10⁹, 10⁹]`. The widest intermediate the walk forms is the spread between `lower - 1` and `upper`, at most `2 × 10⁹ + 1`, which still fits a signed 32-bit integer — no port needs arithmetic wider than the ints it already uses.

**Complexity:** `O(n)` time, `O(1)` space beyond the returned list.
