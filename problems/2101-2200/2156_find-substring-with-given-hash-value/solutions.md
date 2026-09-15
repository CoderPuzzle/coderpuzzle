# Solutions — Find Substring With Given Hash Value

## Backward Rolling Hash

The hash places the lowest power of `power` on the leftmost character of the window, so when a window slides one position left — from `s[i+1..i+k]` to `s[i..i+k-1]` — the old hash transforms in O(1): drop the departing rightmost character's contribution `val(s[i+k]) · power^(k-1)`, multiply the remainder by `power` (which promotes every surviving character's exponent by one), and add the incoming `val(s[i])`. Modding at each step keeps the numbers small. The solution precomputes `top = power^(k-1) mod modulo` once with fast modular exponentiation.

Sliding from right to left rather than left to right is what makes this recurrence clean: each step removes the character at the fixed high-power end and appends at the low-power end, exactly matching the formula. Python's `%` operator returns a non-negative result even after the subtraction, so the arithmetic needs no special guarding (in other languages one adds a multiple of `modulo` first).

The scan starts by hashing the rightmost window `s[n-k..]` directly with increasing powers, then rolls left through every window of length `k`. Because the answer required is the leftmost (first) matching substring, the code scans right-to-left and simply overwrites `answer` on every hit — the final overwrite is the leftmost match, and the loop may even finish early in other formulations. A match is guaranteed to exist by the problem statement, so the returned string is never empty.

**Complexity:** `O(n)` time, `O(1)` extra space (beyond the O(k) returned substring).
