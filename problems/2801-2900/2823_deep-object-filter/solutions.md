# Solutions — Deep Object Filter

## One bottom-up filtering pass

The result is produced by a single post-order walk: every value is
filtered from its members upward. A leaf — a number, string, boolean, or
JSON `null`, which is not an object in JavaScript — stands or falls by
calling `fn` on itself directly: a true verdict keeps the value verbatim,
a false one removes it, which is exactly how Example 1 keeps only `1` and
Example 2 keeps only the two string-valued keys.

An array or object never consults `fn` for itself; Example 3 proves this,
since `[-1, -1, 5, -1, 10]` survives although `fn` answers false for
every array — what matters is only whether anything remains inside after
its own members are filtered, so an empty verdict drops it (`undefined`),
and that emptiness prunes upward level by level until either at least one
member percolates out or, as in Example 4's chain of single-member
arrays, the root collapses to `undefined` too. Rebuilding containers in
member order preserves array positions and object key insertion order.

Each value is visited once and its surviving copy written once, so the
work is linear in the size of `obj`; the extra memory is one frame per
nesting level plus the survivors accumulated on the current path, since
the output containers are built as the recursion returns rather than all
at once up front.

**Complexity:** `O(n)` time, `O(d)` space beyond the output, where `n` is
the total number of values in `obj` and `d` is its nesting depth.
