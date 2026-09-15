# Solutions — Max Stack

## Lazy Max-Heap over Linked Cells

The stack order lives in a doubly-linked list of cells whose tail is the
top: `push` appends at the tail, `pop` unlinks the tail, and `top` reads the
tail cell and nothing else. Alongside the list stands a max-heap of cells
keyed by `(value, sequence number)`; every push stamps its cell with a
rising sequence number and files an entry in that heap, so the maximum
queries have their own structure to ask instead of walking the list.

The heap's tie-breaking is what carries `popMax`'s rule. Among equal values
the heap prefers the larger sequence number, and larger means pushed later,
so the heap's top names the topmost duplicate maximum — exactly the element
`popMax` must remove. It then unlinks that cell wherever it sits: when the
maximum is not the top, the cells above it close ranks over the gap and the
tail does not move.

What the heap never does is forget. `pop` and `popMax` both remove cells
whose entries are still filed, so each cell carries an alive flag, and
`peekMax`/`popMax` discard heap tops that name a dead cell before trusting
one. A stale entry is skipped at most once, so the discards amortize into
the pushes that created them, and the heap holds one entry per element ever
pushed — the price of the O(n) list's mirror in space.

**Complexity:** `O(log n)` time per operation, `O(n)` space.
