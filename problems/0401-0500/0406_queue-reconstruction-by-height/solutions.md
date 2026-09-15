# Solutions — Queue Reconstruction by Height

## Greedy Insert from Tallest to Shortest

The key insight is that a person's position depends only on the people who are taller than or equal to them. If everyone already placed in the queue has height greater than or equal to the next person's height, then that person's index in the queue must be exactly their `k` value — the number of taller-or-equal people in front of them is simply their current position index.

The solution sorts the people by height in descending order, breaking ties by `k` ascending. Processing in this order guarantees that when a person is inserted, everyone already in the queue is at least as tall, so inserting them at index `k` puts exactly `k` taller-or-equal people in front of them. Shorter people inserted later never disturb this: they are invisible to the counts of taller people, because a shorter person in front does not add to a taller person's "greater than or equal" count.

The tie-break on `k` matters for equal heights: among people of the same height, the one with the smaller `k` is inserted first, so when a same-height peer is inserted at their own `k`, at most `k` equal-height people precede them, and the count comes out exact.

The walk over the input is a single pass: sort, then one `list.insert(k, person)` per person. Python's insert shifts the tail of the list, which is fine at these constraints (`people.length <= 2000`). The problem guarantees a valid reconstruction exists, so no placement can ever fail.

**Complexity:** `O(n^2)` time (sorting is `O(n log n)` but each of the n inserts shifts up to n elements), `O(n)` space.
