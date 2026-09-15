# Solutions — Count and Say

## Iterative run-length encoding

The sequence is defined recursively, but nothing in the definition needs recursion: the first term is the fixed string "1", and every later term is the run-length encoding of the one before it. So the method starts at "1" and applies the encoder exactly `n - 1` times — which is also the answer to the follow-up, replacing the recursion with a loop and dropping the call-stack depth of the recursive formulation.

Each encoding pass walks the current term once. At each position it measures the maximal run of consecutive identical characters, emits the run length followed by the digit, and jumps past the whole run. Collecting the pieces and joining them once per pass keeps every character of the term to a constant number of touches.

The term grows by a roughly constant factor at every step (about a third), so the lengths form a geometric series: the final term dominates, and the total work across all passes is a constant multiple of the final term's length `L`. At the ceiling `n = 30` that term has 4462 digits, so the whole computation is a few tens of thousands of character operations.

**Complexity:** `O(L)` time, `O(L)` space, where `L` is the length of the answer.
