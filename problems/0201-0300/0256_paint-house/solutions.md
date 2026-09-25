# Solutions — Paint House

## Rolling minimum over three endings

Painting the row left to right, the only thing the next house needs to know
about the past is the color of its immediate predecessor, so three numbers
carry the whole state after house `i`: the cheapest total that leaves house
`i` red, blue, or green. Advancing to the next house, a color may not extend
its own ending — that is the adjacency rule — so each new ending is that
color's cost plus the smaller of the other two. The forbidden ending is
dropped precisely because it repeats the neighbor's color.

![On costs [[17,2,17],[16,16,5],[14,3,19]] the three endings advance to (17, 2, 17), (18, 33, 7), (21, 10, 37), each costing its cell plus the smaller of the other two endings, finishing at blue 10.](figures/solution-rolling-three-endings.svg)

The code keeps the three endings in three scalars and advances them in one
simultaneous step, every right-hand side reading the previous house's
endings, so no table is ever allocated. A single house needs no loop — the
initial endings are already the candidates — and since the last house may
end in any color, the answer is the smallest of the three survivors.

Taking the cheapest color house by house is not safe, because the cheapest
continuation depends on which color was just used: in
`[[5,6,7],[1,100,100]]` opening with red at 5 forces paying 100 next, while
one extra coin at the first house unlocks the cost-1 paint and finishes at 7. The dynamic program never makes that blind choice — it carries all three
endings forward. At the constraint ceiling the answer is at most
`20 * 100 = 2000`, far inside 32-bit range.

**Complexity:** `O(n)` time, `O(1)` space.
