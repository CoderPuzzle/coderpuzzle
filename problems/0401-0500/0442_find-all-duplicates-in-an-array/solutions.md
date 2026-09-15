# Solutions — Find All Duplicates in an Array

## In-place sign marking, sorted output

Because every value lies in `[1, n]`, the array's own indices can serve as
the hash table: value `v` is assigned slot `v - 1`. One linear pass reads
each element, maps it to its slot, and flips that slot's sign to record
"value seen". When a value's slot turns out to be already negative, that
value was visited before — it is a duplicate, and it is collected. Reading
`abs(nums[i])` keeps the pass correct even when the element being read has
already taken a flip from an earlier visit.

The pass ends with a restore loop that reapplies `abs` to every element, so
the marking leaves the array exactly as it arrived. Constant auxiliary
space holds throughout: the only allocation is the output itself, which the
statement excludes.

This judge pins the output to ascending sorted order, so the collected
duplicates — discovered in array order, not value order — get a final sort.
The sort costs `O(k log k)` on the `k` duplicates and serves only that pin;
the marking itself stays a single linear pass.

**Complexity:** `O(n)` time for the marking pass plus `O(k log k)` for the
output sort; `O(1)` auxiliary space, excluding the output.
