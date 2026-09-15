# Solutions — Deep Merge of Two Objects

Both solutions are the same recursion over the merge rules: two values
of the same container kind — two objects, or two arrays — merge keywise
or indexwise, a key or index held by only one side contributes that
side's value unchanged, and every other pairing hands obj2 back whole.
The only real decision is where the merged containers live. One treats
the answer as new structure and builds a fresh object or array at every
merge point, never touching the inputs. The other notices that obj1's
own containers already have the right identity and writes the merge into
them, so the subtrees obj2 never visits cost nothing at all. Recursion
depth tracks the inputs' nesting, not their serialized length.

## Build a Fresh Merged Value

The rules transcribed with no side effects. Two objects produce an empty
result that first absorbs obj1's keys — shared ones recursively merged
against obj2's values, one-sided ones copied in as they stand — then
appends obj2's exclusive keys. Two arrays size the result to the longer
length and fill each index from the merge of the pair when both sides
have it, from whichever side does when only one does. Every container in
the output is freshly allocated, and each leaf is a reference into obj1
or obj2, so the inputs are never modified and the returned structure
shares nothing with either argument above the leaf level.

The price is allocation: every merged container node — including whole
subtrees obj2 contributes nothing to — buys a new object or array.

**Complexity:** `O(n + m)` time, `O(n + m)` space, where `n` and `m`
are the serialized sizes of obj1 and obj2.

## Merge Into obj1 In Place

The same recursion with the writes redirected. When both values are
objects, the merge walks obj2's keys and assigns into obj1 — recursing
where obj1 owns the key, adopting obj2's value where it does not — and
returns obj1 itself. When both are arrays, obj1's surplus entries beyond
obj2's end already hold the answer untouched, and writing obj2's entries
at their own indices overrides the shared ones and extends obj1 to
exactly the longer length. Anything else returns obj2 whole.

Allocation disappears because the result's container nodes are obj1's
own: only the entries obj2 actually disagrees with are written, and the
inputs' structure becomes the output's. The judge compares the returned
value structurally, so the mutation is invisible — the merged value is
simply the one obj1 ends up holding.

**Complexity:** `O(n + m)` time, `O(d)` space for the recursion stack,
where `d` is the inputs' nesting depth.
