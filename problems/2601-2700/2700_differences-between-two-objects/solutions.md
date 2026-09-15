# Solutions — Differences Between Two Objects

Both structures only ever contain JSON data, so comparison reduces to
per-key decisions made while walking the two trees in lockstep; one
pass over every shared key settles everything.

## Keywise Intersection Descent

For every shared property name — or shared array index, stringified
because difference blocks are JSON objects — the two sides fall into one
of three buckets: both are containers of the same kind, in which case
recurse and keep the sub-result only when it is non-empty; both are
primitives of the same type with equal values (`===`, which also
separates `true` from `1` and `0` from `false`), so nothing is recorded;
otherwise the whole pair `[obj1 value, obj2 value]` is stored under that
key. One-sided keys are skipped outright on the object side (iterate
obj1's keys, require presence in obj2) and on the array side (indices run
only to the shorter length), which is why added or removed keys never
surface.

The guard that demands matching container kinds doubles as the
mixed-type rule: an object meeting an array, a container meeting `null`,
or any primitive meeting any container fails that check immediately and
is recorded as a leaf pair without opening either side — example 4's
whole-value reporting falls straight out of it. So does empty-intersection
equality: two objects sharing no keys contribute no entries, the
sub-result stays `{}`, and the "keep only non-empty results" rule omits
the parent key rather than emitting an empty block.

**Complexity:** `O(n)` time, `O(n)` space, where `n` is the total node
count across both structures.
