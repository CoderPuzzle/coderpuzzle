# Solutions — Maximum Number of Coins You Can Get

## Sort and take every other pile from the middle

Once a triple is fixed, the roles inside it are forced: Alice always takes
its largest pile, Bob always takes its smallest, and you always end up
with the middle one. So the whole problem is really about choosing how to
group the `3n` piles into triples — the payout of each triple is
determined by its own middle value the instant it's formed.

Sort `piles` ascending. The smallest pile in the whole array can never
earn you anything: whichever triple it lands in, it is that triple's
minimum, so it always goes to Bob — you may as well group it with the two
largest remaining piles, since "wasting" it there costs you nothing while
keeping the biggest piles available to satisfy Alice. Applying that
argument repeatedly (give Bob the next-smallest surviving pile, pair it
with the largest surviving pile for Alice, and you keep the pile just
below that largest one) peels the array from both ends and leaves you
with a clean pattern: after sorting, Bob permanently claims indices
`0` through `n - 1`, and you claim every other index from there onward —
`n, n + 2, n + 4, ..., 3n - 2` — with Alice taking what remains in
between. Summing `piles[n], piles[n + 2], ..., piles[3n - 2]` after the
sort gives the answer in one pass.

**Complexity:** `O(n log n)` time, `O(1)` extra space.
