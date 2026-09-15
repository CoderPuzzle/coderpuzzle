# Solutions — Game of Nim

The two solutions take opposite views of the same game. One plays it
out: a memoized game-tree search walks every reachable position and
decides each by asking whether some move strands the opponent on a lost
one. The other never searches at all — Bouton's nim-sum theorem closes
the game in one XOR fold over the array, no tree required.

## Game-Tree Search with Memoization

Take the rules at face value and enumerate play. A position is the
multiset of remaining pile sizes, and the mover facing all-empty piles
has no move and loses — that seeds the recursion. Every other position
is won exactly when some legal move — pick a pile, take from it —
strands the opponent on a position already known lost for them, and
lost when every move hands the opponent a win. Filling that relation
over the whole reachable game tree, bottom-up from the empty board, is
the DP.

Pile order is irrelevant — a position and any rearrangement of it
offer exactly the same moves — so each state is canonicalized to sorted
order before it enters the memo table. That collapses the search to the
sorted vectors of at most seven piles holding at most seven stones: a
few thousand positions, each expanded once over its at most forty-nine
candidate reductions, until the table holds a verdict for every state
the start can reach.

The start position's entry is the answer: true when Alice has a move
that strands Bob on a loss, false when every opening gifts him a won
game. The cost is the state count times the moves per state —
exponential in principle, tiny at these bounds, and the honest price of
not knowing the closed form below.

**Complexity:** `O(8^n · n^2)` time, `O(8^n · n)` space — loose bounds
over the reachable positions; canonicalized, a few thousand memoized
states at these constraints.

## Nim-sum (Bouton's theorem)

Call the XOR of all pile sizes the **nim-sum**. The terminal position —
every pile empty — has nim-sum 0 and the mover loses, which seeds the
argument. From any position with nim-sum 0, every possible move changes
one pile, hence flips the XOR away from 0: a player facing 0 can only
hand the opponent a nonzero nim-sum. From any position with a nonzero
nim-sum, let d be the value's highest set bit; some pile has that bit
set, and that pile p satisfies p XOR nim-sum < p, so reducing it to
p XOR nim-sum is a legal move that lands the opponent back on exactly 0.

The player who faces nim-sum 0 is therefore doomed: whatever they do, the
opponent can always restore 0, stones strictly decrease each turn, and
the terminal all-empty position (nim-sum 0) must eventually arrive on the
doomed player's own turn. Facing a nonzero nim-sum is a win by the same
recycling argument — always answer with the restoring move. Alice moves
first, so she wins exactly when the nim-sum of `piles` is nonzero, which
is one XOR fold over at most seven values. This is the linear-time
solution the follow-up alludes to, and it needs nothing but an integer
accumulator — every pile fits in a few bits, so no overflow concern
exists in any language.

**Complexity:** `O(n)` time, `O(1)` space.
