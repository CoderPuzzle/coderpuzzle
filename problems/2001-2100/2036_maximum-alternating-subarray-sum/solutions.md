# Solutions — Maximum Alternating Subarray Sum

## Two alternating ending states

While scanning left to right, let `plus` be the greatest alternating sum of a
subarray ending at the previous position whose last element has a plus sign,
and let `minus` be the corresponding value whose last element has a minus
sign. For a new value `x`, a plus-ending subarray either starts at `x` or
extends the previous minus state, so its value is `max(x, minus + x)`. The new
minus state must extend the previous plus state and is therefore `plus - x`.

Initialize `plus` with the first element and keep `minus` invalid until a
second element is processed. This prevents an empty or minus-first subarray
from entering the recurrence. Track the greatest valid state after every
update, using 64-bit arithmetic for sums that can exceed 32-bit range.

**Complexity:** `O(n)` time and `O(1)` extra space.
