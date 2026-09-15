# Add Two Polynomials Represented as Linked Lists

## Description

A polynomial is a sum of terms, where each term has an integer
**coefficient** and a non-negative integer **power**, such as
`5x³ + 4x - 7`. A polynomial's terms are kept in **standard form**: sorted
in strictly descending order by power, with no two terms sharing a power,
and no term having a coefficient of `0` (such terms are simply omitted).

You are given two polynomials, `poly1` and `poly2`, each already in
standard form. Add them together and return the sum, also in standard
form.

Adapted representation: the original problem represents each polynomial
as a linked list whose nodes each carry two fields, a coefficient and a
power, in that order. This judge's shared linked-list type carries a
single value per node, so it cannot hold both fields together. Instead,
each polynomial is passed as a 2D array of `[power, coefficient]` pairs —
one pair per term, in the same strictly-descending-by-power standard-form
order described above — and the sum must be returned in the identical
`[power, coefficient][]` format, also sorted in strictly descending order
by power, with any power whose combined coefficient becomes `0` left out
entirely.

![diagram](figures/1634-1.svg)

### Example 1

![diagram](figures/1634-2.svg)

```text
Input: poly1 = [[1,1]], poly2 = [[0,1]]
Output: [[1,1],[0,1]]
Explanation: poly1 is the term x^1 with coefficient 1, i.e. x. poly2 is
the term x^0 with coefficient 1, i.e. 1. The sum is x + 1.
```

### Example 2

```text
Input: poly1 = [[2,2],[1,4],[0,3]], poly2 = [[2,3],[1,-4],[0,-1]]
Output: [[2,5],[0,2]]
Explanation: poly1 = 2x^2 + 4x + 3. poly2 = 3x^2 - 4x - 1. The sum is
5x^2 + 2. The x^1 terms cancel (4x - 4x = 0x) and are omitted.
```

### Example 3

```text
Input: poly1 = [[2,1]], poly2 = [[2,-1]]
Output: []
Explanation: poly1 = x^2, poly2 = -x^2. The sum is 0, so the result is
the empty array.
```

### Constraints

- `0 <= poly1.length, poly2.length <= 10⁴`
- `-10⁹ <= coefficient <= 10⁹`
- coefficient is never `0` for a term present in `poly1` or `poly2`
- `0 <= power <= 10⁹`
- within each of `poly1` and `poly2`, powers are strictly decreasing from
  one pair to the next

## Hints

### Hint 1

Process both inputs at the same time, one pointer into each.

### Hint 2

If the current powers of the two pointers are equal, add this power to
the answer with the sum of the two coefficients — unless that sum is
`0`, in which case the power is omitted entirely.

### Hint 3

If one pointer has a larger power, append that term to the answer and
advance only that pointer.
