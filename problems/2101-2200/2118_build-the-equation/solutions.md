# Solutions — Build the Equation

## Format ordered terms, then concatenate

An inner query formats each row with its explicit sign and absolute factor, then chooses no variable text for power zero, `X` for power one, or `X^power` otherwise. Ordering this query by descending power fixes the required term sequence before aggregation.

`GROUP_CONCAT` joins the ordered terms without a separator, and appending `=0` completes the equation. The factor constraint avoids a zero-sign special case.

**Complexity:** `O(r log r)` time and `O(r)` space for sorting and concatenating `r` terms.
