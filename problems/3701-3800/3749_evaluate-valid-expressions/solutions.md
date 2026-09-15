# Solutions — Evaluate Valid Expressions

## Recursive Descent Parsing

The grammar has exactly two alternatives — an integer literal, or op(a, b) with a three-letter operator — so a single recursive function parse(i) returning (value, next index) covers the whole language. At position i the leading character decides the branch: a digit or '-' begins a literal, whose optional sign and digit run are consumed by a simple scan and converted with int; anything else must be an operator, whose three letters are read in one slice.

The operator branch mirrors the fixed syntax character for character: skip the '(' by jumping four positions past the operator start, recursively parse the first argument, skip the separating comma, recursively parse the second argument, and skip the closing ')' — each recursive call already leaves the index just past what it consumed. Then the four-way test on the operator name applies add, sub, mul, or integer division directly to the two sub-results, so evaluation happens bottom-up on the way out of the recursion, in a single left-to-right pass over the string.

Two constraints deserve attention. Intermediate values can grow to about 2^62, so fixed-width languages must use 64-bit (ideally unsigned or carefully checked signed) integers; Python's arbitrary-precision ints absorb this natively, and the floor division used for div matches the guaranteed-exact quotients. The recursion depth equals the nesting depth of the expression, which is bounded by the input length.

**Complexity:** `O(L)` time (L = expression length), `O(L)` space for the recursion stack.
