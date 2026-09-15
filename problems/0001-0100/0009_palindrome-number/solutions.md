# Solutions — Palindrome Number

## Half-reversal without strings

Two families of inputs are decided before any digit work: a negative number reads with a `-` on one end only, so it can never mirror itself, and a positive number ending in `0` would have to start with `0` to be a palindrome, which no positive decimal writing does. Rejecting the second family up front is what keeps the loop honest later — a number like `10` would otherwise survive the digit comparison on a technicality.

The loop never reverses the whole number. It peels one digit at a time off the tail of `x` onto `reversed_half`, and stops the moment `reversed_half` catches up with what is left of `x` — which happens when the two halves have the same length. At that point `x` holds the front half and `reversed_half` holds the back half in reversed order, so a palindrome is exactly a number whose two halves are equal. Stopping halfway is also why the follow-up's overflow warning never materializes: the reversed side never grows past half the digits, so no 32-bit value can overflow it.

One wrinkle remains: an odd digit count leaves the middle digit stranded in the last place of `reversed_half`. Dropping it with a division by `10` before comparing handles every odd-length number, so the final check is `x == reversed_half` for even lengths or `x == reversed_half // 10` for odd ones.

**Complexity:** `O(log x)` time, `O(1)` space.
