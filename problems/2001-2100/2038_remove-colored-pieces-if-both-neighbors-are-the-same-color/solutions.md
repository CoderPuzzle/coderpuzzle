# Solutions — Remove Colored Pieces if Both Neighbors are the Same Color

## Count removable interiors

In a maximal run of one color with length `L`, exactly `max(L - 2, 0)` pieces can eventually be removed by that color's player. Removing an interior piece shortens that run by one and consumes exactly one of its remaining moves. Runs of opposite colors never merge, so one player's removals cannot change the other player's total. Equivalently, scan every length-three window: a window of three `'A'`s contributes one Alice move, and a window of three `'B'`s contributes one Bob move. A run of length `L` contains exactly `L - 2` such windows.

Alice moves first and turns alternate. Therefore, she wins precisely when her total is greater than Bob's: she can answer every Bob move and still have one left. If the totals are equal, Alice is the first player unable to move; if Bob has more, Alice also runs out first.

**Complexity:** `O(n)` time and `O(1)` auxiliary space.
