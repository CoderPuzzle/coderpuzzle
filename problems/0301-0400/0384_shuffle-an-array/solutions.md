# Solutions — Shuffle an Array

## Fisher-Yates From a Pristine Original

Two obligations shape the class. `reset` must resurrect the initial configuration at any moment, and `shuffle` must make all `n!` orderings equally likely. The first is met by never letting `shuffle` touch the stored data: the constructor parks a copy of `nums` as `original`, `reset` returns a copy of it, and each `shuffle` starts from a fresh copy that it is free to destroy.

The shuffle itself is Fisher-Yates: walking `i` from the last slot down to `1`, swap slot `i` with a uniformly chosen slot `j` in `[0, i]`. After the swap, slot `i` holds its final value and is never revisited. Counting outcomes proves uniformity — step `i` has exactly `i + 1` equally likely choices, every sequence of choices produces a distinct ordering, and there are exactly `n!` such sequences for `n!` possible orderings, so each ordering carries probability exactly `1 / n!`. The near-miss variant that picks `j` from the whole array (`[0, n)`) at every step has `n^n`-style sequence counts with unequal multiplicity per permutation — visibly biased within a few hundred thousand draws, which is exactly the regime the statistical judge samples (each judged `shuffle` is invoked thousands of times and each ordering's empirical frequency must match `1 / n!` within a tolerance band).

Both the Python and Java canonical solutions implement this verbatim, with `random.randrange(i + 1)` / `ThreadLocalRandom.current().nextInt(i + 1)` as the uniform source.

**Judged scale.** A frequency table over whole returned arrays only stays enumerable for small `n` — the judge's keys are the arrays themselves, so the statistical `shuffle` cases are restricted to at most five elements (120 orderings, checked over ~170000 draws; smaller arrays use proportionally fewer). Larger arrays would need astronomically many draws before each bucket's expected count cleared the noise floor. `reset` is exact-compared and is exercised across the full constraint range the cases cover; the uniformity argument above is size-independent.

**Complexity:** `O(n)` per `reset`/`shuffle` (a copy plus one swap per slot), `O(n)` space.
