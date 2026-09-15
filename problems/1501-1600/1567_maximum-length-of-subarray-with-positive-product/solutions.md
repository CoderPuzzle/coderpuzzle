# Solutions — Maximum Length of Subarray With Positive Product

## Running positive/negative length

A single pass tracks two running lengths ending at the current index:
`posLen`, the length of the longest subarray ending here whose product
is positive, and `negLen`, the length of the longest one whose product
is negative. Both reset to `0` whenever a zero is seen, since no
subarray crossing a zero can have a nonzero product.

At each element the sign of the value tells us how to extend these
lengths. A positive value keeps every sign as it was: `posLen` grows by
one, and `negLen` grows by one only if it was already positive (there
was a negative subarray to extend), otherwise it stays `0`. A negative
value flips every sign: the subarray that used to end negative now ends
positive, and the one that used to end positive now ends negative, so
the two lengths swap roles before each gets its `+1` — the new `posLen`
comes from the old `negLen` (if any), and the new `negLen` comes from
the old `posLen` extended by one, since extending any positive-ending
run by a negative value always yields a negative-ending run of length
`posLen + 1`. The running maximum of `posLen` over the whole scan is the
answer.

**Complexity:** `O(n)` time, `O(1)` space.
