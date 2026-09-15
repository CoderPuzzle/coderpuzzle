# Solutions — Maximum Alternating Sum of Squares

## Largest squares on the plus terms

Squaring erases every sign, so which elements were negative does not matter:
only the multiset of squared magnitudes gets scored. Every arrangement has
ceil(n / 2) plus slots (the even indices) and floor(n / 2) minus slots (the
odd indices), and an exchange argument forces the best assignment. If a
larger square sits on a minus slot while a smaller one sits on a plus slot,
swapping the two changes the score by twice their difference, a strict gain;
so no optimal arrangement leaves a bigger square below a smaller one across
the split. The largest ceil(n / 2) squares belong on plus slots and the rest
on minus slots.

Sorting the squared magnitudes turns that assignment into a simple split:
with the squares ordered ascending, every entry from index floor(n / 2)
onward is added positively and every earlier entry negatively, and the
answer is the difference of the two partial sums. The degenerate shapes come
out right for free — a single element occupies the only plus slot, an
all-equal multiset cancels to zero whenever n is even, and an odd length
simply parks one extra large square on the plus side, which is exactly the
edge the alternating pattern creates.

Magnitude is the real trap: a single square reaches 1.6 * 10⁹ and the
running sum climbs toward 8 * 10¹³ across the full 10⁵ elements, far past
32-bit range, so fixed-width languages must accumulate and return in 64-bit
integers. That worst case still sits comfortably below 2⁵³, which keeps
plain JavaScript and TypeScript numbers exact — no BigInt needed.

**Complexity:** `O(n log n)` time, `O(n)` space.
