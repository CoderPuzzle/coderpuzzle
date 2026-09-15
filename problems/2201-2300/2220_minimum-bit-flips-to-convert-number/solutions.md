# Solutions — Minimum Bit Flips to Convert Number

## XOR, then count the set bits

A flip can fix at most one differing bit position, and every differing
position must eventually be fixed, so the minimum number of flips is exactly
the number of positions where the binary forms of start and goal disagree.
XOR-ing the two numbers concentrates that information in one value: a bit of
`start ^ goal` is 1 precisely when start and goal differ there. The answer is
the popcount of this single word.

Each language counts set bits with its native idiom — `count_ones`,
`bits.OnesCount`, `Integer.bitCount`, C++20 `popcount` — while JavaScript and
TypeScript clear the lowest set bit per iteration with `diff &= diff - 1`
(Kernighan's trick), counting one flip per step.

**Complexity:** `O(1)` time (at most 30 differing bits), `O(1)` space.
