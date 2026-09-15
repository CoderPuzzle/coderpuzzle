# Solutions — The Score of Students Solving Math Expression

## Precedence evaluation and interval result sets

Compute the correct value in one pass by accumulating each multiplication run
before adding it to the total. Separately, let each interval of operands store
the set of values obtainable from every binary parenthesization. Splitting an
interval at every operator and combining its left and right sets generates all
wrong-order results; values above `1000` can be discarded because answers are
bounded, and multiplication uses wide intermediates before that filter.

Each submitted answer earns 5 points if it equals the correct value, checked
first even when that value also belongs to the interval set. Only other values
in the full-expression set earn 2 points; everything else earns zero.

**Complexity:** `O(m³R² + n)` time and `O(m²R)` space, where `m` is the number of operands and `R <= 1001` is the largest stored result-set size.
