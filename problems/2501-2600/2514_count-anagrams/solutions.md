# Solutions — Count Anagrams

## Multinomial Counting

Anagrams of `s` are chosen word by word: permuting one word of `s` never
interacts with the choices made for any other word, since each output word
must be a permutation of exactly its input counterpart. So the total count
is the product over words, and for a single word the count of distinct
permutations is the multinomial coefficient `n! / (c₁! · c₂! · …)`, where
`n` is the word length and each `cᵢ` counts the occurrences of letter i —
`n!` orders all positions as if letters were distinct, and dividing by the
factorial of every letter's multiplicity removes the reorderings that only
shuffled identical copies.

Everything runs modulo `10⁹ + 7`. The numerator is accumulated as
`1·2·…·n` while scanning the word; each denominator factor enters through
its modular inverse, computed with Fermat's little theorem — because the
modulus is prime, `x^(p−2)` inverts `x`. Word lengths are at most
`10⁵`, so every factorial fits comfortably in a 64-bit accumulator once it
is reduced after each multiplication.

**Complexity:** `O(n log p)` time over an input of length n (the `log p`
from the modpows), `O(1)` extra space.
