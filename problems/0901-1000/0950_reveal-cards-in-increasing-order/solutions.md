# Solutions — Reveal Cards In Increasing Order

The reveal procedure is deterministic once an ordering is fixed, and with
distinct values it is invertible: running it forwards is a bijection from
orderings to reveal sequences, so exactly one ordering reveals the cards in
increasing order. That ordering is built in one backwards pass over a deque,
after a sort.

## Reverse simulation with a deque

Sort the deck; the reveal sequence must be the sorted cards, so the largest
card is revealed last. Construct the answer from the largest card down to
the smallest, keeping the partially built ordering in a deque. Placing a
card on the top is the reverse of revealing it, and the reveal's companion
step — put the next top card at the bottom — reverses into moving the bottom
card to the top. So before each placement, when the deque is non-empty,
move its bottom card to its top, then push the new card on the front. The
largest card starts the deque alone; the smallest ends on top of the
finished deck, which is then read front to back.

Why the result is correct follows by induction, unwound from the last
reveal: after the cards `k..n` of the sorted order are placed, the deque is
precisely the state whose next reveals, with the intervening bottom-moves,
emit exactly those cards in order. Placing card `k-1` on the top after one
more undone move extends the invariant, and running the statement's
procedure on the finished ordering reveals the sorted deck — the expected
answers are checked against exactly that forward simulation.

Python, Java, C++, and Rust carry a real double-ended queue; Go uses
`container/list`, the standard doubly-linked list; the two script languages
use a plain array, where `unshift` and `pop` stand in for the two deque
ends — at `n <= 1000` the O(n) head insert is harmless, and the sort that
opens the pass dominates the work either way.

**Complexity:** `O(n log n)` time, `O(n)` space.
