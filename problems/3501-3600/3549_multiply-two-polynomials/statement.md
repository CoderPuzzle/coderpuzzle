# Multiply Two Polynomials

## Description

You are given two integer arrays poly1 and poly2, where the element at
index i in each array represents the coefficient of xⁱ in a polynomial.

Let A(x) and B(x) be the polynomials represented by poly1 and poly2,
respectively.

Return an integer array result of length (poly1.length + poly2.length - 1)
representing the coefficients of the product polynomial R(x) = A(x) * B(x),
where result[i] denotes the coefficient of xⁱ in R(x).

### Example 1

```text
Input: poly1 = [3,2,5], poly2 = [1,4]
Output: [3,14,13,20]
Explanation: A(x) = 3 + 2x + 5x² and B(x) = 1 + 4x
R(x) = (3 + 2x + 5x²) * (1 + 4x)
R(x) = 3 * 1 + (3 * 4 + 2 * 1)x + (2 * 4 + 5 * 1)x² + (5 * 4)x³
R(x) = 3 + 14x + 13x² + 20x³
Thus, result = [3, 14, 13, 20].
```

### Example 2

```text
Input: poly1 = [1,0,-2], poly2 = [-1]
Output: [-1,0,2]
Explanation: A(x) = 1 + 0x - 2x² and B(x) = -1
R(x) = (1 + 0x - 2x²) * (-1)
R(x) = -1 + 0x + 2x²
Thus, result = [-1, 0, 2].
```

### Example 3

```text
Input: poly1 = [1,5,-3], poly2 = [-4,2,0]
Output: [-4,-18,22,-6,0]
Explanation: A(x) = 1 + 5x - 3x² and B(x) = -4 + 2x + 0x²
R(x) = (1 + 5x - 3x²) * (-4 + 2x + 0x²)
R(x) = 1 * -4 + (1 * 2 + 5 * -4)x + (5 * 2 + -3 * -4)x² + (-3 * 2)x³ + 0x⁴
R(x) = -4 -18x + 22x² -6x³ + 0x⁴
Thus, result = [-4, -18, 22, -6, 0].
```

### Constraints

- `1 <= poly1.length, poly2.length <= 5 * 10⁴`
- `-10³ <= poly1[i], poly2[i] <= 10³`
- poly1 and poly2 contain at least one non-zero coefficient.

## Hints

### Hint 1

Use Fast Fourier Transform (FFT)
