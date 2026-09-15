# Solutions — Join Two Arrays by ID

One hash-map fold resolves every collision, and a final id sort imposes the
required order.

## Id-Keyed Map Fold, Then Sort

A `Map` accumulates one merged record per unique id while absorbing the
inputs in concatenation order, arr1 then arr2. The first occurrence of an
id seeds a spread copy of its object — spread because the record handed to
later steps must be solution-owned, never an alias into the case data.
Every later occurrence folds in key-by-key: a key shared with what has been
accumulated so far simply overwrites it with the arriving object's entire
value, which is exactly the shallow merge semantics — nested containers are
replaced whole rather than combined, as Example 3 shows when arr2's
`{"c": 84}` displaces arr1's whole `{"b": 94}` tree — while keys seen for
the first time ride along untouched on either side. Because ids are unique
within each input array, at most two occurrences ever contend, so each
record receives at most one overriding write per key.

Emitting the map's values in insertion order would preserve first
appearance, but the statement demands ascending id order instead, so the
records are sorted once by their numeric `id` before being returned. That
single comparison sort is the only non-linear step: absorption touches each
object and each of its keys exactly once, and the result graph's size is
bounded by the serialized input sizes.

**Complexity:** `O(n + u log u)` time and `O(n)` space, where `n` counts
the key-value pairs in both arrays and `u` is the number of unique ids
(bounded by `JSON.stringify(arr1).length + JSON.stringify(arr2).length`).
