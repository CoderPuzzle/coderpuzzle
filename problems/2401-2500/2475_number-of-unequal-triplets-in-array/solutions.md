# Solutions — Number of Unequal Triplets in Array

## Count frequencies and multiply

A triplet's three elements are three distinct _positions_; whatever their
values, those positions can be sorted into exactly one `i < j < k` order.
So a valid triplet is fully described by choosing one element of each of
three distinct values, and every such choice yields exactly one counted
triplet. The index ordering is automatic — it is never an extra constraint.

That reduces the count to a product. For a fixed value `v` used as the
value-sorted middle of a triple, the elements of any smaller value may sit
before it and the elements of any larger value after it: there are
`left * freq[v] * right` triplets whose middle value is `v`, where `left`
counts all elements with a value less than `v` and `right` counts all
elements with a value greater than `v`. Each valid triplet has exactly one
value-sorted middle, so summing this product over every distinct value
counts each triplet once and nothing else.

The implementation tallies frequencies in a fixed table indexed by value —
values lie in `[1, 1000]` — then walks values upward, accumulating `left`
as it goes. The whole scan is one pass over 1000 entries, independent of
the array's actual length, and the running products stay far below any
32-bit bound (`C(100, 3) = 161700` is the maximum possible answer).

**Complexity:** `O(n + V)` time, `O(V)` space, where `V <= 1000` is the
value range.
