# Solutions — Apply Transform Over Each Element in Array

## Manual build, one call per index

The result array is constructed by an explicit loop that pushes exactly
`fn(arr[i], i)` at every position. Both the element and its index travel
to every single call — even when the fn's parameter list only declares a
prefix of them, as Example 3's zero-argument `constant` shows — so any
fn shape from the statement's contract behaves identically to how
`returnedArray[i] = fn(arr[i], i)` is defined.

Nothing is ever dropped or overwritten: mapping differs from filtering in
that every call contributes its output slot regardless of value, so a
result array always has `arr.length` entries — built by our own
`Array.prototype`-free walk rather than the banned `map`. Because
`i` increments in lockstep with the push order, positional identity holds
by construction and no reindexing can occur.

The bound in the constraints (`fn returns an integer`, inputs within ±10⁹)
keeps every computed entry inside 32-bit range for all corpus fns, and the
whole job is constant work per element over the preallocated-growth
output buffer.

**Complexity:** `O(n)` time, `O(n)` space, where `n` is `arr.length`.
