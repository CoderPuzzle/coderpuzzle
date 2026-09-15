# Solutions — Number of Ways to Wear Different Hats to Each Other

## Bitmask Dynamic Programming Over Hats

The decisive observation is the asymmetry in the constraints: there are at most 10 people but up to 40 hats. A state that records which subset of people already wears a hat therefore has at most 2^10 values, while the hats can be folded into the progression of the algorithm. Let dp[mask] be the number of ways to give distinct hats, chosen from the hats considered so far, to exactly the people whose bits are set in mask.

The algorithm walks the hat ids from 1 to 40. For each hat it starts the next table as a copy of the current one — this encodes the option of leaving the hat unused — and then, for every mask holding a nonzero count and every person who likes this hat and is absent from the mask, adds dp[mask] into the entry for the mask with that person's bit set. Updating into a copy rather than in place guarantees that each counted way uses each hat at most once, so no two people can end up wearing the same hat.

Hats that nobody wants are skipped outright, since for them the copy step would change nothing. Every addition is reduced modulo 10^9 + 7, and unreachable masks simply stay at zero and are skipped. After all hats are processed, the answer is the entry for the full mask of all n people: every person must receive a hat, while unused hats cost nothing. With n at most 10 the table never exceeds 1024 entries, so even the worst case of 40 hats × 1024 masks × 10 people is tiny.

**Complexity:** `O(40 · n · 2^n)` time, `O(2^n)` space.
