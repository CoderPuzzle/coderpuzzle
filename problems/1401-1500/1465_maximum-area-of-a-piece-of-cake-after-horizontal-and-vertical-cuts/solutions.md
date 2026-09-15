# Solutions — Maximum Area of a Piece of Cake After Horizontal and Vertical Cuts

## Widest strip in each direction

The cuts are full lines across the cake, so every piece is the
intersection of one horizontal strip and one vertical strip, and its area
is the product of the two strip widths. The pieces vary independently in
the two directions, so the largest piece is simply the widest horizontal
strip times the widest vertical strip.

Sorting each cut array (with the cake's own edges `0` and `h` / `w`
acting as boundary cuts) turns the strips into consecutive differences;
one scan takes each direction's maximum gap. Neither sort order in the
input matters, and distinctness of the cuts guarantees positive gaps.

The two maxima can each reach `10⁹`, so their product reaches `10¹⁸` —
comfortably inside 64-bit integers and, since it is below `2⁵³`, exactly
representable even where integers are doubles; the single modulo at the
end produces the reported value.

**Complexity:** `O(n log n + m log m)` time for the two sorts,
`O(1)` extra space.
