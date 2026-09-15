# Solutions — Maximum Substrings With Distinct Start

## Greedy cut scan with a used-start set

A piece is defined by where it starts, so the whole question is which
positions get to be starts. Scanning left to right makes that decision once
per position: the current letter wants to start a new piece, and it may do
so exactly when no earlier piece already started with it. If it has, the
letter simply joins the piece in progress; if it has not, the previous piece
ends here and a fresh one begins. A set of seen start letters answers the
membership test, and a counter increments on every accepted start.

This greedy never sacrifices a later piece: accepting the current letter as
a start removes only that letter from future starts, but each letter starts
at most one piece anyway, so nothing is given up. By induction over the 26
possible letters, every distinct character of s ends up starting some piece
— the first occurrence of any letter always finds its letter unused — so
the scan reaches the upper bound the problem allows. The count equals the
number of distinct letters, computed as a single linear pass.

**Complexity:** `O(n)` time, `O(1)` space.
