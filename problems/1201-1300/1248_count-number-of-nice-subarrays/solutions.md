# Solutions — Count Number of Nice Subarrays

Both counters turn "exactly `k`" into a contract one sweep can keep true.
The prefix tally remembers every odd-count a prefix has reached and closes
each element against the count `k` smaller — one lookup per element, paid
for with an `n + 1` slot table of history. The at-most windows remember
nothing: they count the subarrays holding at most `cap` odds — a contract
a window can always repair by retiring elements from the left — and read
exactly `k` off as `atMost(k) - atMost(k - 1)`, trading the table for a
second sweep and constant extra space.

## Prefix Sum Counting

The key insight is that only the parity of each element matters: mapping every odd number to 1 and every even number to 0 turns "subarray with exactly `k` odd numbers" into "subarray with sum exactly `k`". That classic problem is solved by prefix sums — a subarray ending at the current position has `k` odds exactly when its odd-count prefix minus some earlier prefix equals `k`.

The solution keeps `odds`, the running count of odd numbers seen so far (the current prefix), and `counts[c]`, how many earlier prefixes had odd-count exactly `c`. At each element the parity bit `x & 1` updates the prefix, and every earlier prefix with count `odds - k` pairs with it to close one nice subarray, so `result += counts[odds - k]`. The current prefix is then recorded for future elements to pair with. Seeding `counts[0] = 1` accounts for the empty prefix at the very start, which is what makes subarrays beginning at index 0 countable.

The guard `odds - k >= 0` simply avoids negative indices before enough odds have accumulated; since `odds` never exceeds the array length `n`, the counts array of size `n + 1` covers every reachable prefix value. Each element is examined once with constant work, and an array with fewer than `k` odd numbers naturally yields 0 because the lookup index never becomes valid.

**Complexity:** `O(n)` time, `O(n)` space.

## At-most windows by subtraction

Exactly `k` is an awkward contract for a window: a single odd arrival can
push it over, and there is no symmetric way back. At most `cap` is the
accommodating form — grow while the budget holds, and when an odd breaks
it, retire elements from the left until it holds again. Counting subarrays
with at most `cap` odds is therefore a textbook shrinking window, and the
exact count falls out of two of them: `atMost(k)` covers every window with
`k` or fewer odds, `atMost(k - 1)` the ones with strictly fewer, and their
difference is precisely the windows holding exactly `k`.

The helper sweeps once per cap holding a single invariant: `[left, right]`
carries at most `cap` odds, and `left` is the smallest start for which it
still does. Each step extends `right`; an odd that pushes the count over
`cap` forces the left end forward until the budget is restored, and since
both ends only ever advance the sweep stays linear. With the invariant in
hand, every subarray ending at `right` and opening at `left` or later also
fits the budget, so `right - left + 1` joins the total. The `cap < 0`
guard is never taken under the statement's `k >= 1`; it merely lets the
helper answer on its own terms.

The second sweep replaces the tally table entirely: the whole state is
three integers, and the extra memory no longer grows with `n`. Example 1
makes the subtraction concrete — `atMost(2)` over `[3, 8, 3, 3]` counts 9
windows, `atMost(1)` counts 6, and their difference is the expected 3.

**Complexity:** `O(n)` time, `O(1)` space.
