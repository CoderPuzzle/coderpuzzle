# Solutions — Palindrome Linked List

Both approaches settle the definition the same way — the front half of
the list has to be held against its back half, mirror for mirror — and
they differ only in where the back half waits while the comparison
runs. The array copy lifts every value out of the list in one walk and
reads the copy from both ends with two indices — the plain reading of
the property, paid for with `O(n)` extra memory. The middle-reverse
walk keeps the values where they stand: two pointers find the middle,
the back half is reversed in place, and one pass compares the halves
node for node — the `O(n)` time and `O(1)` space the follow-up asks
for, so the walk closes the file as the reference.

## Array copy, two-ended compare

A palindrome is a property of a sequence, and the direct way to check a
sequence in both directions is to hold it as an array. One walk copies
every value out of the list in order — `node` steps down the `next`
links while each `val` lands at the tail of the copy — and the list
itself is never touched: nothing is unlinked, no pointer is rewritten.

The compare then reads the copy from both ends at once. `i` starts at
the front and `j` at the back, and each step asks whether the mirror
pair agrees — `values[i]` against `values[j]`; a mismatch answers
`false` on the spot. When the indices meet (odd length) or cross (even
length), every pair has been checked exactly once and all agreed, so
the answer is `true` — the middle value of an odd-length list never
faces a partner, and it needs none, being its own mirror.

The copy is one pass and the compare at most half of another, so the
time stays linear; the array is the whole space bill, and it is exactly
the memory the follow-up rules out — the reason the in-place walk below
exists.

**Complexity:** `O(n)` time, `O(n)` space.

## Middle by two pointers, second half reversed

A palindrome's back half, read forward, repeats its front half — so the question is really how to hold both halves up against each other at once. Copying the values into an array and comparing against its reverse answers that with `O(n)` extra memory, which is exactly what the follow-up rules out; the list itself has to be rearranged instead. Two pointers find the middle in a single pass: `slow` steps one node at a time, `fast` two, and when `fast` runs off the end, `slow` stands at the front of the back half.

The back half is then reversed in place — each node is unlinked and prepended to a growing `second` list, three pointer writes per node — so it reads backward. One pointer walks from `head`, one from `second`, and the two move in lockstep comparing values. On an odd length, `slow` lands on the middle node, so the middle ends up at the tail of `second` and faces itself in the final comparison, which cannot fail; every other node is checked against its mirror exactly once.

The reversal leaves the back half backward when the method returns — the original statement never asks for the list to be restored, and only the boolean ever crosses the wire, so the mutation is unobservable. The whole method touches each node a constant number of times across the three passes and allocates nothing beyond a handful of pointers.

**Complexity:** `O(n)` time, `O(1)` space.
