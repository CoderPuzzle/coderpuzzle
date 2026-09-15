# Solutions — Flip Columns For Maximum Number of Equal Rows

## Row Normalization by XOR with the First Cell

Flipping a set of columns XORs one fixed mask K onto every row simultaneously. A row r becomes uniform exactly when r XOR K is all 0s or all 1s, i.e. when r equals K or the complement of K. Two rows can therefore be made uniform together precisely when they are identical or complementary — the flips that fix one fix the other for free, and no other pair can be satisfied simultaneously. The answer is the largest group of rows that are pairwise identical-or-complementary.

Rather than comparing rows pairwise, the code maps every row to a canonical key: each value XOR-ed with the row's own first cell. Identical rows collapse to the same key, and complementary rows also collapse to the same key (complementing flips every bit, so each XOR with the first cell — itself flipped — yields the identical normalized tuple; a row already all-equal normalizes to all zeros). Counting keys in a dictionary and taking the maximum gives the size of the best simultaneous group, which the corresponding mask K (the normalized key or its complement) realizes with actual flips.

Edge cases are absorbed by the construction: a single-column matrix trivially makes every row uniform and every key is the 1-tuple (0), giving m; rows that start uniform count together whether they are all 0s or all 1s. One pass over the matrix does all the work.

**Complexity:** `O(m·n)` time, `O(m·n)` space.
