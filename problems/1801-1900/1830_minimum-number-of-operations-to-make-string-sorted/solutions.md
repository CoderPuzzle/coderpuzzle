# Solutions — Minimum Number of Operations to Make String Sorted

One operation moves `s` to its previous lexicographic permutation — the
largest descent picks the pivot, the largest block of smaller letters
supplies the swap, and the reversed suffix restores maximal order below it.
So the operation count is not simulated at all: it is the number of
distinct permutations of `s`'s multiset that sort strictly before `s`, the
first hint's reframing.

## Count the permutations below s, per position

A permutation is smaller than `s` exactly when it agrees with `s` up to
some position `i` and then places a smaller remaining letter there. With
`rem = n - 1 - i` slots after `i` and remaining multiplicities `cnt`, each
smaller leading letter fixes `cnt[letter]` one lower and contributes
`rem! / prod(cnt!)` completions — a multinomial. Summing over the letters
below `s[i]` collapses the per-letter multinomials into one expression,
`rem! × smaller × den`, where `smaller` is how many remaining characters
are below `s[i]` and `den = prod(1/cnt!)` is shared; after placing `s[i]`
itself, `den` merely gains a factor `cnt[s[i]]`, since
`1/(cnt - 1)! = cnt / cnt!`. Each position is then one multiply-accumulate
— the second hint's "solve every suffix separately", batched.

Division does not exist mod `10⁹ + 7`, so `den` runs on inverse factorials:
one Fermat inversion `fact[n]^(p-2) = 1/n!` seeds a table filled downward
by `inv_fact[i-1] = inv_fact[i] · i`, giving every `1/cnt!` as a lookup.
Residues stay below `p`, so a product of two needs 64-bit range
(`p² ≈ 10¹⁸`): `long` in Java, `long long` in C++, `int64` in Go, `i64` in
Rust, exact big integers in Python. The JavaScript and TypeScript ports run
the same algorithm over `BigInt`, because two residues multiply to
`~10¹⁸`, past `2⁵³` where `Number` silently rounds; the final residue is
below `10⁹ + 7` and converts back exactly.

The scan is `O(26n)` — for each of the 3000 positions, one run over the
alphabet below `s[i]` — and the tables are `O(n)`, comfortably inside the
limits in all seven languages.

**Complexity:** `O(26 · n)` time, `O(n)` space for the factorial tables,
where `n` is the length of `s`.
