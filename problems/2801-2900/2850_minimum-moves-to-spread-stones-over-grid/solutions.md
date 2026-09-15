# Solutions — Minimum Moves to Spread Stones Over Grid

## Backtracking donors for every empty cell

Only two kinds of cells matter: empty cells, which each still need one
stone, and cells holding two or more stones, which have some to spare.
Because the grid always contains exactly nine stones, the surplus units
hidden in the overfull cells are exactly as many as the empty cells to
fill, so a solution is a perfect pairing of the two groups. The cost of a
pairing is the Manhattan distance between its endpoints: a stone walked
along a shortest path of side-adjacent cells pays exactly that many moves,
and since intermediate cells only borrow a stone on the way through, the
walks never disturb the one-stone-per-cell bookkeeping at either end.
Conversely, no plan of moves can beat this bound — following any valid
sequence backwards decomposes it into per-stone walks whose lengths are at
least the Manhattan distance between where a stone started and ended.

That pairing view turns the search into a small backtracking over choices.
The empty cells are visited in a fixed order; for each one, every cell that
still holds at least two stones is tried as its donor, paying the Manhattan
distance between the two cells, before undoing the choice and moving on.
The recursion bottoms out once all empty cells are filled and returns the
cheapest total found. A stone taken from the same donor by different empty
cells is handled naturally: each donation decrements that cell's remaining
count for the deeper calls, so it stops being eligible once only one stone
is left.

The search space stays tiny. At most four cells ever hold more than one
stone (hint 1), so exploring a full pairing visits at most `aᵇ` choice
combinations — bounded by 6561 no matter how the nine stones sit, and in
fact far smaller: enumerating every assignment reaches at most 90 complete
pairings, peaked by three piles of three. Each pairing does constant work
over the fixed 3 * 3 board, so the whole computation is constant-sized.

**Complexity:** `O(1)` time, `O(1)` space.
