# Solutions — Convert Doubly Linked List to Array I

Both solutions build the same freshly allocated chain and wire it the same
way — every node appended after the one before it, pointing back through
`prev` at exactly that predecessor, with the first node the lone append that
has nothing behind it. What separates them is when the chaining happens. One
decouples the work: a sweep gathers the values into a buffer, and a second
sweep turns the buffer into nodes. The other interleaves the two: each input
node is read and answered in the same step, so no value is ever held
anywhere but inside the node it becomes.

## Collect the Values, Then Chain

Sweep one is a plain read: walk the input, appending every value to a
buffer. Splitting the read from the build keeps each loop trivial — the
first touches only `val` fields, the second only fresh nodes — and it is
also what makes the two sweeps need each other: by the time the chaining
sweep starts, the input list can no longer be reached, so the buffer is the
only record of what to build.

Sweep two chains: a `first` handle remembers the head to return, a `tail`
handle stands on the node just appended, and every buffered value becomes a
node hung off that tail with its `prev` pointed back at it. The branch on
"was there a tail?" fires exactly once, for the head, whose `prev` is the
one link that must stay null. The price is the buffer: every value is held
twice on the way through — once in the array, once in the node it becomes —
so the peak memory grows with the list.

**Complexity:** `O(n)` time, `O(n)` space.

## Single-Pass Tail Append

The observation that removes the buffer: a node does not need to wait for
its value's neighbors to be known. Appending is a purely local act — the
fresh node needs only the current tail, and the tail is always the node
built one step ago — so the read and the build fuse into one walk. Each
iteration consumes one input node, allocates its answer node, links
`tail.next` forward and `fresh.prev` backward in the same breath, and slides
both handles one position right.

The first iteration is the only special case, and only because the head's
`prev` is null: the branch is the same "was there a tail?" test, taken once.
Every value lives in exactly one place — the node it becomes — so beyond the
answer's own nodes the walk keeps two handles and the walking cursor, all of
it constant.

**Complexity:** `O(n)` time, `O(1)` space.
