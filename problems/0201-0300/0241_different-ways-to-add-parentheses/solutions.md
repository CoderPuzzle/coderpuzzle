# Solutions — Different Ways to Add Parentheses

## Divide and conquer at every operator

A fully parenthesized evaluation is a binary expression tree, and the operator at its root is one particular operator occurrence of the string. So the enumeration lets every operator take its turn as the root: for each one, it recurses on the subexpression to its left and the subexpression to its right, and combines the two sides' value lists under that operator in a full cross product. Each grouping is produced exactly once — its root split is tried at exactly one level — and a range containing no operator is a single operand, whose one grouping is the number itself.

The statement pins the answer's order — values ascending, duplicates kept — while the recursion emits each root operator's cross products in string order, which is not a stable answer. One ascending sort at the end closes the gap. Duplicates need no care in either direction: nothing deduplicates, so two groupings that evaluate to the same value, like the two `-10` entries of `2*3-4*5`, each contribute their own entry.

The recursion is deliberately unmemoized. The length ceiling of 20 admits at most 10 operands and 9 operators, hence at most Catalan(9) = 4862 groupings, and the plain recursion's recomputation of shared subexpressions keeps its total work a small multiple of that — a memo table keyed by substring would buy nothing at this ceiling while costing hashing and allocation in every language. Arithmetic stays in 64-bit integers throughout: the widest products the constraints admit (seven 99s multiplied, about 9.3 × 10¹³) overflow 32-bit arithmetic even though generated tests promise 32-bit results.

**Complexity:** `O(n · Cₙ)` time and `O(Cₙ)` space including the output, where `n` is the number of operators and `Cₙ` the matching Catalan number.
