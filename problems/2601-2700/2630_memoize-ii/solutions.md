# Solutions — Memoize II

## Tree of Maps over the Argument Spine

The cache is a tree whose spine walks one argument position at a time. Each
level is a `Map` holding that position's already-seen branches, and a fully
consumed argument list parks its result under a private leaf symbol. A replay
descends as far as its tuple reaches: primitives sit directly under their own
value (a `Map` compares keys exactly like `===`, keeping `1`, `"1"` and `true`
apart while treating `+0` and `-0` alike), and every object occurrence sits
under a `Symbol` minted once per reference through a `WeakMap`. Structural
twins therefore stay distinct — Example 2's fresh literals never hit — while
the shared objects of Example 3 collapse onto one branch after their first
call.

![Replaying example 1's [[2,2],[2,2],[1,2]] grows the map-trie spine 2→2 to a parked result of 4, replays it on the second call without touching fn (calls stays 1), and opens a fresh level-0 branch 1→2 for the third call — each distinct tuple costs exactly one fn() call, two in total.](figures/solution-map-trie-spine.svg)

The judged replay wraps `fn` in a counter before handing it to this memoizer,
so each pass through the wrapper marks one genuine invocation and every row
records the running total with its value. Because only an exact miss descends
to `fn`, a warm branch short-circuits without touching the wrapped function at
all, which is precisely what the `calls` column observes: duplicate-heavy
replays freeze at their first count, distinct-heavy replays climb by one per
row. Symbol keys can never collide with primitive map keys (`5` versus the
symbol naming object #5 live in disjoint key spaces), so no aliasing across
argument types is possible.

**Complexity:** `O(A)` time for a replay of `A` total arguments (each
argument lands in exactly one map operation), `O(A)` space.
