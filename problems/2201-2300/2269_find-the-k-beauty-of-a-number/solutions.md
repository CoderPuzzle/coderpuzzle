# Solutions — Find the K-Beauty of a Number

## Sliding window over the digit string

A substring is a contiguous block of characters, so reading `num` as a string
lets one length-`k` window slide across the digits one at a time. Instead of
re-parsing each window, the code keeps its integer value incrementally:
dropping the leading digit, shifting the rest left, and adding the new
trailing digit costs constant time per step. The window value is what
matters, so windows with leading zeros (`"04"` → 4) are handled naturally,
and a window whose value is `0` can never divide `num`.

At every position the current window is tested: it must be nonzero and must
divide `num` exactly. Because `num <= 10⁹` its decimal form has at most ten
digits, so the whole scan is over a tiny alphabet of windows; the value in
any window is at most `10⁹` and stays well within a 32-bit integer. Counting
the successful windows yields the k-beauty.

A simpler formulation is to extract each window with a slice and convert it
back to an integer; the rolling value only avoids that per-window work. The
check itself is identical, so the two approaches agree on every input.

**Complexity:** `O(d)` time where `d` is the number of digits of `num`
(≤ 10), `O(1)` space.
