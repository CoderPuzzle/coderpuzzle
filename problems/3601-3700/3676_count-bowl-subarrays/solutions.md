# Solutions — Count Bowl Subarrays

## Nearest greater elements on both sides

Every bowl is pinned by its interior maximum. Let `m` be the position of the
largest element strictly between the rims. Everything between the left rim
and `m` must stay below `nums[m]`, and likewise on the right, while each rim
itself must exceed `nums[m]`. That leaves exactly one candidate per side:
the left rim can only be the nearest strictly greater element to the left of
`m` (anything nearer would breach the ceiling from inside, anything farther
would itself sit below `nums[m]`), and symmetrically for the right rim. Two
different interior maxima also cannot pin the same pair of rims — whichever
of the two values is smaller has the other as its nearest greater neighbour,
not a distant rim — so counting the positions that have a strictly greater
element on both sides counts every bowl exactly once.

A single monotonic sweep does the counting. Walk `nums` left to right keeping
a stack of values seen so far in strictly decreasing order. When the current
value pops entries off the stack, each popped entry has just met its nearest
greater element to the right, and whatever remains directly beneath it on the
stack is its nearest greater element to the left: one bowl, unless the stack
emptied underneath it, which means no greater element exists on the left.
Entries never popped never meet a greater element to their right. Each index
is pushed and popped once, so the answer falls out of the pop events.

**Complexity:** `O(n)` time, `O(n)` space.
