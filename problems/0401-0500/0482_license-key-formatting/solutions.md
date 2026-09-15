# Solutions — License Key Formatting

## Clean the key, then take groups of k from the end

The dashes in the input carry no information — they are separators, not
content — so the first move is to drop every one of them and uppercase what
remains. That leaves a plain alphanumeric key, and once it exists the
reformatting is almost entirely determined: every group holds exactly `k`
characters except possibly the first, so the only freedom in the whole problem
is how long that first group is.

Counting from the end settles it. The last `k` characters form a full group,
the `k` before those form another, and so on; whatever is left over at the
front is the first group. In numbers: with `n` characters in the key, the
first group has `n % k` characters, or the full `k` when `k` divides `n`
evenly — which is why the first group is short only when the length leaves a
remainder. The code reads that head size off the cleaned length, takes it as
the opening group, then slices the rest in strides of `k` and joins everything
with dashes.

Because the dashes are removed before any grouping, it never matters where they
sat: leading, trailing, or several in a row all reduce to the same cleaned key.
A key shorter than `k` collapses into that single short first group, and a
string that was nothing but dashes cleans to the empty key, which comes back as
the empty string.

**Complexity:** `O(n)` time, `O(n)` output space.
