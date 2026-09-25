# Solutions — Add Two Numbers

## Digit-by-digit addition with carry

Because both linked lists store the digits least-significant first, the sum can be computed exactly like grade-school column addition by walking the two lists in parallel from their heads: add the two current digits plus the incoming carry, write the ones digit to the result, and propagate the tens digit. No reversal or conversion to integers is needed.

![Adding l1 = [2, 4, 3] and l2 = [5, 6, 4] column by column: 4 + 6 = 10 writes 0 and carries 1, so the final column is 3 + 4 + 1 = 8 and 342 + 465 = 807 reads out [7, 0, 8].](figures/solution-column-addition-carry.svg)

A dummy head node anchors the result list so the first node is not a special case; `tail` always points at the last node built. The single loop condition `while l1 or l2 or carry` elegantly handles all the edge cases at once: lists of different lengths (a missing list simply contributes nothing once it runs out), and a final carry that still needs a node — for example `5 + 5` produces the extra leading digit in `[0, 1]`. `divmod(total, 10)` splits each column total into the new carry and the digit to append.

When the loop ends, both inputs are exhausted and the carry is zero, so `dummy.next` is the complete sum. The result has at most `max(m, n) + 1` nodes, the `+1` being the possible final carry.

**Complexity:** `O(max(m, n))` time, `O(max(m, n))` space.
