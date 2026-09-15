# Solutions — How Many Apples Can You Put into the Basket

## Take the Lightest Apples First

The basket's limit is a single shared budget of 5000, so which apples you
pack decides only how many fit. Exchanging any packed apple for a lighter
one never breaks the packing and frees budget for more — an optimal
packing can always be assumed to consist of the lightest apples. So sort
the weights ascending and keep adding apples while the running total stays
within the capacity; the first apple that would overflow it ends the scan,
and everything after it is at least as heavy.

The sums stay tiny: at most `10³` apples of `10³` each, `10⁶` total, well
inside 32-bit range even before the early stop.

**Complexity:** `O(n log n)` time for the sort, `O(1)` extra space beyond
the sort (or `O(log n)` stack depending on the sort).
