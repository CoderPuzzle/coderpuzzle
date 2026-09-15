# Solutions — Design Movie Rental System

## Tokenized Lazy Heaps over a Fixed Price Table

Prices are immutable — `price[(shop, movie)]` is settled at construction and
never consulted for anything but lookup. The only dynamic state is which
copies are rented, and the two queries want that state grouped differently:
`search` ranks one movie's unrented copies by `(price, shop)`, while `report`
ranks all rented copies by `(price, shop, movie)`. So the class keeps one
min-heap per movie for the unrented side and one global min-heap for the
rented side, moving a copy between them on `rent` and `drop`.

The classic difficulty is deletion: heaps cannot remove an arbitrary entry,
and a copy that is rented, dropped, and appears again indistinguishably in a
heap would be reported twice. The solution is to never reuse an entry: every
push carries a fresh **token** (from a global counter), and the owning side
records the currently live token per `(shop, movie)`. Renting invalidates the
unrented token, dropping mints a new one — so an entry is garbage exactly
when its token is no longer the recorded one, and identical-looking entries
from different cycles never both count.

`search` and `report` then run the same routine: pop past garbage, collect
the first five live entries, and push those five back — valid entries are
peeked, never consumed, so answering a query never changes the state. Each
entry is pushed once and discarded at most once, so the cleanup amortizes
into the pushes.

Both the Python and Java canonical solutions implement exactly this scheme.
The Python one keys maps on `(movie, shop)` tuples; the Java one packs the
pair into a `long` (`high * 10 000 001 + low`) and stores heap entries as
`long[] {price, shop[, movie], token}`.

**Complexity:** `O(log n)` per `rent`/`drop`, `O(k log n)` per `search`/
`report` (plus amortized garbage cleanup), `O(n)` space over `n` entries.
