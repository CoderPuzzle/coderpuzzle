# Solutions — Partial Function with Placeholders

## Copy-and-Consume Splice

`partial(fn, args)` returns a wrapper whose only job is assembling the
final argument list per call: it copies `args` (the caller's array is never
touched), then walks the copy left to right with a cursor into `restArgs`,
overwriting every element that is exactly `"_"` with
`restArgs[cursor++]`. Two details carry the whole specification: the
placeholder test is exact string equality at the top level of `args` only,
so a `"_"` hiding inside a nested array or a near-miss like `"__"` is an
ordinary value and stays put; and consumption is strictly sequential from
index 0, which makes duplicate placeholders draw consecutive `restArgs`
entries. Whatever the cursor has not reached when the walk ends is simply
appended — `restArgs.slice(cursor)` — exactly the leftover tail the
statement assigns to the end of the modified args.

The invocation itself is a spread call, `fn(...modified)`, so the elements
travel as separate arguments rather than as one array, and whatever `fn`
returns comes straight back through both wrappers. Under the stated
constraints every placeholder finds a fill value (their count never
exceeds `restArgs.length`), so the walk always empties the cursor's debt;
an exhausted `restArgs` would leave the surplus `"_"` literals in place by
the same code path. One pass builds the list, so the cost is linear in its
length.

**Complexity:** `O(n + m)` time, `O(n + m)` space, where `n` is
`args.length` and `m` is `restArgs.length`.
