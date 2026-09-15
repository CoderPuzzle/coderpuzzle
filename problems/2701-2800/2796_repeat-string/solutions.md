# Solutions — Repeat String

## Binary Squaring on String.prototype

The enhancement installs `replicate` on `String.prototype` through
Object.defineProperty with the descriptor shape of a native method —
writable and configurable, but non-enumerable — so ordinary string users
never see it in for-in scans while it stays replaceable. Inside, the
receiver may arrive boxed or primitive depending on how the method was
invoked, so it normalizes once through `String(this)`. Repetition then
proceeds by squaring: a running `power` holds the string doubled up to
each power-of-two block not exceeding `x`, and each set bit of `x`
appends its block to the result. Reading `x` in binary means at most
⌊log₂ x⌋ + 1 block appends and ⌊log₂ x⌋ doublings — for `x = 10⁵` that is
about thirty-two concatenation operations instead of one hundred
thousand loop iterations.

Under the Follow-up's simplifying assumption that concatenation costs
O(1), this is exactly the requested O(log n) algorithm. Without that
assumption the bound is honest work rather than magic: any correct
`replicate` must materialize `len × times` result characters, so
Θ(len · times) copying is unavoidable once the answer is flattened —
doubling merely avoids paying an extra factor of `times` on top of it.
Engines whose concatenation builds rope-shaped cons strings keep the
intermediate doublings cheap precisely because they defer that
flattening until the result is actually read.

**Complexity:** `O(log n)` time under the stated O(1)-concatenation model (Θ(len · times) characters produced), `O(len · times)` space.
