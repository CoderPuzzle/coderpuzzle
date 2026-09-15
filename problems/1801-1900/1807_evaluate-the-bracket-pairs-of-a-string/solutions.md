# Solutions — Evaluate the Bracket Pairs of a String

Load `knowledge` into a hash map, then walk `s` once. Outside a bracket
pair every character is copied verbatim; on `'('` jump straight to the
matching `')'`, look the enclosed key up in the map, and emit the value —
or `"?"` when the key is unknown.

## Single pass with a key map

The two structural guarantees do all the work. Because brackets never
nest, the first `')'` after a `'('` closes exactly that pair, so the
pass can skip over the key with one search instead of tracking a stack.
And because every value consists solely of lowercase letters, a
substitution can never contain a bracket: what gets emitted is final,
and the pass never has to re-examine text it has already produced.
Either way the result is built left to right in one sweep.

With `n = s.length` and `k` the total size of `knowledge`, building the
map costs `O(k)` and the sweep visits each character of `s` a constant
number of times — the search for `')'` always resumes scanning after it
— for `O(n + k)` overall. The output buffer dominates the footprint at
`O(n + k)` as well; the map holds at most one entry per knowledge pair.

**Complexity:** `O(n + k)` time, `O(n + k)` space.
