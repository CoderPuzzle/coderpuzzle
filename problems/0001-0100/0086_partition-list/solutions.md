# Solutions — Partition List

## Two dummy chains

The order-preservation requirement is what rules out anything clever: no swapping values into place, because a swap inside one partition can reorder it. Instead, two dummy heads anchor two chains — one collects the nodes with values below `x`, the other everything `>= x` — and a single walk down the original list appends each node to whichever chain claims its value. Appending in walk order is the whole trick: each chain is built back-to-front in exactly the order its nodes appeared, so both partitions preserve the original relative order by construction, never by repair.

The splice at the end is where the care goes. `before_tail.next` adopts `after_head.next`, joining the finished chains — and if one side collected nothing, the join simply degenerates to the other chain, which is why empty inputs and all-on-one-side inputs need no special cases. The final cut, `after_tail.next = null`, is not decoration: the last node appended to the high chain still carries its original successor link, and that successor now lives somewhere in the low chain, so leaving the link intact would turn the spliced list into a loop.

The Rust port needs no cut at all: the walk takes each node's `next` link with `take()` before choosing a chain, so every link is consumed as the list is dismantled and the high chain's tail is already detached when the splice runs.

**Complexity:** `O(n)` time, `O(1)` space.
