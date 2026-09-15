# Apply Discount Every n Orders

## Approach: Price map plus a customer counter

The constructor keeps a product-to-price map and a counter of served
customers. `getBill` walks the two parallel arrays, accumulating
`amount[j] * price(product[j])` — an exact integer total, since every
input is a small integer and the sums stay below 2⁵³. After incrementing
the counter, a customer whose count is a multiple of n pays
`bill * (100 - discount) / 100`; everyone else pays the subtotal itself.

The discount expression multiplies before dividing on doubles, and every
operand up to that point is exact, so the single correctly-rounded
operation fixes the result — well inside the 10⁻⁵ tolerance the statement
grants.

**Complexity:** O(k) per bill for k purchased lines, O(P) setup for the
price map.
