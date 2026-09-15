# Solutions — Shortest Completing Word

A completing word is decided by a multiset cover — with `P` the plate's
length and `W` the total number of characters in `words`, everything about
it is visible in two small counts. The plate, once its digits and spaces
are dropped and its letters case-folded, demands a certain multiplicity of
each of the 26 letters, and a word completes exactly when its own letter
counts reach that demand everywhere. The alphabet is fixed, so both
multisets fit in a constant-size counter and the search collapses to one
sweep over `words` keeping the first word that achieves a new shortest.

## Count the Demand, Sweep Once

Fold the plate into a 26-slot demand counter in a single pass: ASCII places
every uppercase letter 32 codes above its lowercase twin, so one range check
plus 32 folds the case, and digits and spaces match neither letter range and
demand nothing. Each candidate word then lands in a fresh 26-slot counter of
its own, and the covering test is `counts[i] >= demand[i]` for every slot.
Extra letters are free — the word may hold anything beyond the demand — and
multiplicity is precisely what the counters compare: a plate reading "ss"
demands two 's's, one more than a plate reading "s", and a word holding a
single 's' completes the latter but never the former.

The selection follows the statement's tie rule without any comparator. The
sweep replaces the incumbent only on strictly shorter length, so among
equally short completing words the first one seen survives, and any word at
least as long as the incumbent is skipped before its letters are even
counted — a pruning that saves work but never changes the answer. The
statement guarantees a completing word exists, so the sweep always ends
holding one.

**Complexity:** `O(P + W)` time, `O(1)` space.
