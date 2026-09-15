# Solutions — Find the Duplicate Number

Both approaches keep the statement's two promises — the array is only ever
read, and the working storage is a couple of integers. The bisection leaves
the array's layout alone and interrogates the value domain: with `n + 1`
entries squeezed into `n` values, the count of entries at or below a
threshold `x` exceeds `x` exactly when the repeat sits at or below `x`, and
each halving of the range costs one full counting scan. Floyd's cycle
detection makes the array carry the information instead — read as a linked
list where cell `i` leads to cell `nums[i]`, the repeat is the loop's entry,
and a two-speed pointer walk lands on it in a single linear chase.

## Value Bisection

The search space is the range `1..n`, not the array. Define `count(x)` as the
number of entries whose value is at most `x`. Were every value `<= x` to occur
at most once, `count(x)` could not exceed `x` — only `x` distinct values are
available below the threshold — so `count(x) > x` certifies that the repeat
lies at or below `x`. The converse holds too: once the repeat `d` is `<= x`,
every entry above `x` comes from a value occurring at most once (the one
repeat is already below the threshold), so those entries number at most
`n - x`, forcing `count(x) >= n + 1 - (n - x) = x + 1`. The predicate is
therefore exact — `count(x) > x` if and only if `d <= x` — and monotone in
`x`, precisely the shape binary search needs.

The bisection maintains `lo <= d <= hi`, opening at `1` and `n` (where
`count(n) = n + 1` makes the predicate true outright). Each step takes
`mid = (lo + hi) / 2`, counts the entries at or below it in one pass, and
retires the half the count acquits: an excess sends `hi` down to `mid`, a
shortfall pushes `lo` past it. After about `log2 n` halvings the bounds meet,
and the value they meet on is the repeat.

On `[2,5,1,4,2,3]` with `n = 5`: `count(3) = 4 > 3`, so `hi = 3`;
`count(2) = 3 > 2`, so `hi = 2`; `count(1) = 1`, so `lo = 2`; the bounds have
met on 2, the repeated value.

Neither restriction is strained. The scan only compares and counts — nothing
is written, ever — and the storage is two bounds plus a running counter, none
of which grows with `n`. The price of refusing the pointer chase is the extra
log factor: every halving re-reads the whole array.

**Complexity:** `O(n log n)` time, `O(1)` space.

## Floyd's Cycle Detection (Linked-List View)

The key reframing is to treat the array as a function from indices to indices: position `i` "points to" position `nums[i]`. Since there are `n + 1` positions but every value lies in `[1, n]`, following these pointers must eventually revisit a position — the sequence enters a cycle, and the duplicate value is precisely the cycle's entry point, because two different indices `i` and `j` with `nums[i] == nums[j] == d` both point into node `d`.

![The array [1,3,4,2,2] drawn as an implicit linked list 0 -> 1 -> 3 -> 2 -> 4 -> 2: indices 3 and 4 both point at node 2, so 2 is the cycle entry and the duplicate.](figures/solution-implicit-list-cycle.svg)

The solution runs Floyd's tortoise-and-hare on this implicit list. The tortoise advances one pointer per step (`slow = nums[slow]`) and the hare two (`fast = nums[nums[fast]]`); both start at index 0, which is significant because index 0 cannot be inside the cycle (no value is 0), guaranteeing the standard algorithm's precondition. When they meet, both are somewhere inside the cycle.

The second phase finds the cycle entrance: reset `slow` to 0 and advance both one step at a time. The classic distance argument shows they meet exactly at the entry node — if the tail before the cycle has length `μ` and the meeting point is `λ` steps past the entry, then `μ ≡ λ (mod cycle length)`, so both pointers arrive at the entry after exactly `μ` more moves. That entry index is the returned duplicate.

This satisfies both restrictions: the array is never modified and only two integer variables are used. A pathological input like `[3,3,3,3,3]`, where every node points directly to node 3, is just a cycle of length 1 preceded by a tail, and the algorithm still converges. Note the problem guarantees exactly one repeated value (appearing two or more times), which is what makes the single-cycle-entrance argument sound.

**Complexity:** `O(n)` time, `O(1)` space.
