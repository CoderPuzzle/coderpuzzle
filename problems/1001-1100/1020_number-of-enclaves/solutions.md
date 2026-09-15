# Solutions — Number of Enclaves

## Flood-fill in from the boundary

A land cell survives the count only if no sequence of land moves ever
reaches the grid's edge. That is exactly the land NOT connected, through
land, to any boundary cell — so start an iterative flood-fill (an explicit
queue, not recursion, since the grid can be up to 500 x 500 and recursive
DFS would risk overflowing the call stack) from every land cell that
already sits on the boundary. Push each boundary land cell into the queue
and mark it visited; then repeatedly pop a cell and push its 4-directional
land neighbours that haven't been visited yet. Diagonal neighbours never
count, so a region touching the boundary only corner-to-corner is not
reached by this fill.

Once the fill drains, every land cell it touched can walk off the grid;
every land cell it never touched cannot, no matter how many moves it takes,
because a land path to the boundary would have been exactly the path the
fill discovered. A final sweep over the whole grid counts the land cells
the fill left untouched — that count is the answer.

**Complexity:** `O(mn)` time, `O(mn)` space.
