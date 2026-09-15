# Solutions — Match Alphanumerical Pattern in Matrix I

## Scan every corner, grow a bijection

Every candidate upper-left corner is checked in row-major order, so the first
match found is automatically the one with the lowest row index and, on ties,
the lowest column index — the required tie-breaking costs nothing extra.
With at most 50 × 50 corners there is no need for anything smarter than this
exhaustive scan.

Validating one candidate takes a single pass over the pattern cells holding
two maps: `letter -> digit` and `digit -> letter`. A digit cell must equal
its literal. A letter cell must repeat the digit its letter was already
assigned, and a digit already claimed by a different letter rejects the
candidate; together the two maps enforce that each distinct letter maps to
one digit and distinct letters map to distinct digits. The candidate passes
when the pass completes without a rejection.

**Complexity:** `O(R · C · Pᵣ · P_c)` time for a board of `R × C` and a
pattern of `Pᵣ × P_c` cells, `O(k)` space for the two maps with `k` distinct
letters (at most 26).
