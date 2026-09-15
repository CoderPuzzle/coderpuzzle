# Solutions — Distance Between Bus Stops

## Sum the Arc, Subtract from the Circle

On a circle there are exactly two routes between two stops, and they
partition the edges: every edge lies on one route or the other. So once
one arc's length is known, the other is `total − arc` — no second walk is
needed.

Order the two stops so the lower index comes first; the clockwise arc from
the lower to the higher is just the sum of `distance[i]` for indices in a
plain range (edge `i` leads from stop `i` to stop `i + 1`, so the arc uses
exactly the entries between the two stops). The counterclockwise route is
everything else. Whichever of the pair is smaller is the answer, and equal
values are fine — both routes tie.

The sums stay small: at most `10⁴` edges of `10⁴` each, `10⁸` total, well
inside 32-bit range but summed in the language's natural integer width.

**Complexity:** `O(n)` time for the two sums, `O(1)` extra space.
