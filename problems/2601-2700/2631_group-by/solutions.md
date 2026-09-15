# Solutions — Group By

## Single-Pass Bucket Append

The enhancement installs one method on `Array.prototype`, so every array —
including arrays built after the install, not just the judged case's instance
— gains `groupBy`. The walk is a plain sequential loop: for each item it asks
the selector for the key, creates the bucket as an empty array the first time
a key appears (guarded by an own-property check so keys like `"constructor"`
or `"toString"` behave as data rather than inherited slots), and pushes the
item on.

Because items are visited in array order and each bucket is appended to in
that same visit order, every value list comes out exactly in "the order the
items appear in the array" without any post-sorting. Key ordering inside the
returned object falls out of first appearance; the problem accepts any key
order, so nothing else constrains it. Each item costs one selector call and
one push, and buckets are never rebuilt or re-scanned after creation.

**Complexity:** `O(n)` selector calls and appends for an array of `n` items,
`O(n)` space.
