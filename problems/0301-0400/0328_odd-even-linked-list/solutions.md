# Solutions — Odd Even Linked List

## Weave two chains in place

Grouping by index parity sounds like two collections to gather and rejoin, but the statement's `O(1)` space mandate rules out copying anything — the list itself has to carry both groups. Two tail pointers step through it a pair at a time: the odd tail absorbs the node after the even tail, the even tail absorbs the node after that, and every node lands on exactly one of two chains that grow by relinking the original nodes. The even chain's head is remembered before the walk starts, because the weave overwrites the one link that reaches it.

The loop guard asks whether the even tail and a node beyond it both exist, so each pass relinks exactly one pair — the pair whose parity the two tails represent. An odd length leaves its final node on the odd chain untouched, an even length consumes the whole list, and empty and single-node lists never enter the loop at all: they pass through unchanged. Because each chain absorbs nodes in traversal order, the relative order inside both groups stays the input's, exactly as the statement requires.

When the walk ends, one splice finishes the job: the odd tail's `next` is pointed at the remembered even head. Every relink is a pointer write on an existing node, nothing is allocated, and each node is written a constant number of times.

**Complexity:** `O(n)` time, `O(1)` space.
