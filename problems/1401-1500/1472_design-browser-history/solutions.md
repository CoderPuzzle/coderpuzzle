# Solutions

The whole history is a linear sequence of urls with a cursor: `visit`
truncates everything after the cursor and appends, `back` and `forward`
clamp the cursor against the sequence bounds. An array plus an index does
this directly; the two-stack formulation is the same idea split across
two containers. Both give constant-time clamped moves and amortized
constant-time appends, so the array version below is the presentation.

## Array Plus Cursor

Keep every visited url in a list `history` and remember `cur`, the index
of the current page. `visit(url)` drops the forward history by truncating
the list to `cur + 1` entries, appends `url`, and advances the cursor.
`back(steps)` decrements the cursor by at most `steps` (and never past 0)
before returning `history[cur]`; `forward(steps)` mirrors it upward,
clamped to the last valid index. Every call touches only the cursor
position or an append, so each operation runs in amortized constant time
over the 5000-call bound.

**Complexity:** `visit` is amortized `O(1)` per call (`O(L)` for url
lengths); `back`/`forward` are `O(1)`. Space `O(V · L)` for `V` visits of
urls of length `L`.
