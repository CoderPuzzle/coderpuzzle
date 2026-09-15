# Solutions — Binary Search Tree Iterator II

## Precomputed Array With a Moving Pointer

Because the iterator must move both forward and backward through the
same ordering, the natural fix is to compute that ordering once and
walk it with an index instead of re-deriving neighbors on the fly. The
constructor runs an iterative in-order traversal (an explicit stack, so
a tall, unbalanced tree never risks a call-stack overflow) and stores
the resulting ascending values in an array. The pointer is just an
integer index into that array, initialized to `-1` to represent the
"before the first value" position the problem describes.

`hasNext()` checks whether `index + 1` is still inside the array, and
`next()` performs that increment before returning the value it lands
on. `hasPrev()` and `prev()` are the mirror image, checking and moving
toward `index - 1`. Because every step only touches the pointer and one
array slot, both directions retrace exactly the same in-order values
regardless of how many times the walk changes direction.

The array is built once and never resized or recomputed, so every call
after construction does a fixed, small amount of work no matter how
large the tree is or how many calls follow.

**Complexity:** construction is `O(n)` time and `O(n)` space to build
the array; every `hasNext`, `next`, `hasPrev`, and `prev` call after
that runs in `O(1)` time.
