# Solutions — Minimum Runes to Add to Cast Spell

## SCC Condensation with Forward Reachability from Crystals

Within a strongly connected component every focus point can already reach every other, so the requirement "has a crystal or receives flow from another focus point" is uniform across a component: it holds for all of an SCC's nodes iff the component itself contains a crystal or is reachable from one that does. The first phase therefore contracts the graph into its condensation DAG using iterative Kosaraju — a forward DFS producing a finish order, then reverse-graph sweeps in reverse finish order to label components; both phases use explicit stacks so a `10⁵`-node graph cannot overflow recursion.

On the DAG, components containing crystals are marked good and a BFS forward along condensation edges propagates goodness to everything downstream — each such component is satisfied for free by existing runes. Any remaining component needs a new rune, and the efficient place to spend it is a source: adding one rune into a bad component with in-degree zero (from any crystal component) satisfies it and its entire downstream reach, which is never smaller than helping a non-source component. Conversely each bad source cannot be fixed through another bad component without first fixing that one, so at least one rune per bad source is necessary.

Counting the bad components with in-degree zero in the condensation therefore gives the exact minimum. Cross-component edges are deduplicated with a seen-set while building the DAG's in-degree table so repeated edges between the same pair of components don't distort the source count.

Edge cases: components that are part of a cycle with a crystal anywhere inside are all good; isolated nodes with no runes at all form singleton components counted as sources unless they hold a crystal; the graph may have up to `2 · 10⁵` edges, all handled in linear time.

**Complexity:** `O(n + m)` time, `O(n + m)` space.
