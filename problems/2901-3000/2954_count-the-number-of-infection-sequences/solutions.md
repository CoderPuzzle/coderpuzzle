# Solutions — Count the Number of Infection Sequences

## Multinomial interleaving of shedding blocks

The initially infected people cut the line into blocks of uninfected
people, and each block evolves independently. A block at an edge of the
line (before the first or after the last sick person) has exactly one
infectable person at any moment — the endpoint adjacent to the infected
side — so its internal infection order is forced. An interior block,
wedged between two sick people, can shed from either endpoint at each
step; infecting `len` people that way reaches every one of the
`2^(len - 1)` choose-a-side-per-step patterns exactly once, because a
block's infection order is determined by which endpoint it sheds from at
each of its steps.

The remaining freedom is the interleaving: at every step one of the still
non-empty blocks sheds one person, so a full sequence is a merge of the
blocks' internal orders. Counting merges of sequences of lengths
`len_1..len_m` is the multinomial `S! / (len_1! * ... * len_m!)` with `S`
the total number of uninfected people. Multiplying in each interior
block's `2^(len - 1)` (Hint 5's closed form) gives the answer — one pass
over the gaps of `sick` once factorials, inverse factorials (Fermat's
little theorem, since 10^9 + 7 is prime), and powers of two are tabulated
up to `n`.

Every intermediate is a product of two residues below `10^9 + 7`, under
`1.1 * 10^18`, so 64-bit arithmetic holds everywhere except JavaScript
and TypeScript, where the multiplies run on BigInt.

**Complexity:** `O(n)` time, `O(n)` space.
