# Solutions — Maximum Value Sum by Placing Three Rooks II

The three rooks occupy three distinct rows, so among those rows there is a
middle one by index. Everything above it lives in a contiguous top region
and everything below in a contiguous bottom region, which turns the board
into three bands around the chosen middle row. A column's contribution to a
band is just the largest cell value in that column within the band, so the
search decomposes into one middle row plus one column from each band.

## Prefix and suffix column maxima over the middle row

Fix a middle row `i` and precompute, for every column, the best value above
it (`top[j] = max over rows 0..i-1 of board[r][j]`) and below it
(`bottom[j] = max over rows i+1..m-1 of board[r][j]`). A legal placement
picks one column from `top`, one from the middle row itself, and one from
`bottom`, all three distinct. Only the three most valuable columns of each
list can ever matter: if a placement used a column outside a list's top
three, that list has three better columns and at most two of them are taken
by the other rooks, so a free better column always exists — the same
pigeonhole that trims each row to its top three cells. Trying the `3 × 3 ×
3` combinations of the three lists' top-three columns and keeping those with
pairwise-distinct columns is then exact.

Computing the two max tables costs one pass per column (`O(mn)`), and every
middle row re-reads only its row and the two tables' top-three columns, so
the whole sweep is linear in the board size. Sums of three values reach
`3 · 10⁹` in absolute value, past the 32-bit range, so the fixed-width
languages accumulate in 64-bit (`long long`/`long`/`int64`/`i64`);
JavaScript numbers stay exact because `3 · 10⁹` sits far below `2⁵³`.

**Complexity:** `O(mn)` time, `O(mn)` space.
