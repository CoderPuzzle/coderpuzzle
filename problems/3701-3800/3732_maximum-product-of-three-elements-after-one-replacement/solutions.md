# Solutions — Maximum Product of Three Elements After One Replacement

## Extreme-pair sweep

The mandatory replacement carries more leverage than any original element:
whatever two untouched elements end up multiplied together, the overwritten
slot can contribute ±10⁵, and no element of the array reaches that
magnitude. So an optimal triple always has the shape (signed extreme) × (pair
product): set the replaced value to +10⁵ when the pair's product is positive
and to -10⁵ when it is negative, realizing 10⁵ times that pair's absolute
product. Letting a triple avoid the replaced slot cannot beat this either —
each of its three elements is itself bounded by 10⁵ in magnitude — so the
whole problem collapses to finding the pair of original values with the
largest absolute product.

That pair consists of the two elements of largest magnitude, and magnitude is
V-shaped across a sorted array: absolute values fall toward the element
closest to zero and rise again toward the far end. The two winners therefore
always come off the two ends of the array — they sit among the two smallest
and the two largest values — which is why sorting is unnecessary here.

One sweep keeps those four values in four slots. The slots hold positions
rather than distinct values, so duplicates survive naturally, and with only
three elements the four slots still cover every one of them. Taking the
largest absolute product over the six pairs of the four extremes and
multiplying by 10⁵ yields the answer; pair products reach 10¹⁰ and the final
answer 10¹⁵, both comfortably inside signed 64-bit range.

**Complexity:** `O(n)` time, `O(1)` space.
