# Solutions — Array Partition

## Sort ascending, sum every second element

Each pair contributes exactly its smaller member, so pairing a small value
with anything larger sacrifices precisely that small value — the larger
partner is pure loss. The smallest element loses in every possible pairing,
and the only question is which value it takes down with it. The cheapest
choice is its sorted neighbor: if the two smallest values `a1 <= a2` sat in
pairs `(a1, x)` and `(a2, w)`, re-pairing them as `(a1, a2)` and `(x, w)`
scores `a1 + min(x, w)`, never less than the original `a1 + min(a2, w)`,
because both `x` and `w` are at least `a2`.

Stripping that pair and repeating the exchange inward leaves every element
matched with a sorted neighbor: `(1st, 2nd), (3rd, 4th), ...`. The score is
then simply the even-indexed elements of the ascending array — the 1st, 3rd,
5th, ... values — so only the multiset matters, never the input's order.
Nothing in the argument assumes distinct or positive values: duplicates, a
single all-equal array, or negatives dominating all fall out the same way.

The code sorts `nums` ascending in place and walks the even indexes,
summing. At the constraint ceiling (`n = 10⁴`, every value `10⁴`) the sum
tops out at `10⁸`, comfortably inside 32-bit range.

**Complexity:** `O(n log n)` time, `O(1)` extra space beyond the sort.
