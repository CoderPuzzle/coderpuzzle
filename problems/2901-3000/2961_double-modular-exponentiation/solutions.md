# Solutions — Double Modular Exponentiation

The full powers aᵢ^bᵢ and (aᵢ^bᵢ % 10)^cᵢ are astronomically large, but
only their residues survive to be compared: first modulo 10, then modulo
mᵢ. Modular arithmetic lets each exponentiation be carried out on numbers
that never exceed the final modulus squared.

## Fast modular exponentiation per index

For every index, compute the last digit of aᵢ^bᵢ with binary
exponentiation — square the running product and multiply in the base
whenever the current exponent bit is set, reducing modulo 10 at every
step. Then repeat the same routine once more, reducing modulo mᵢ instead,
to evaluate (aᵢ^bᵢ % 10)^cᵢ % mᵢ. The index is good exactly when that
second residue equals target. Because every intermediate value is a
residue below 10³, squaring stays below 10⁶ and machine integers carry
everything; the exponent loops run at most ten bits each, so the whole
array costs a couple of thousand multiplications at the stated limits.

**Complexity:** `O(n · log b)` time, `O(1)` space.
