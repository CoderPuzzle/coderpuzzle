# Solutions — Minimum Cuts to Divide a Circle

## Parity of the slice count

Each final slice is a wedge bounded by two rays from the center to the
circumference. For `n` equal slices those rays must be spaced `360 / n`
degrees apart. A radius cut contributes exactly one such ray; a diameter
cut contributes two, and the two rays of one diameter are forced `180`
degrees apart.

Whether a diameter can be used at all is decided by parity. Two opposite
rays both belong to an equally spaced set of `n` rays exactly when the
set is closed under rotation by half a turn, which happens only for even
`n`. For odd `n` no two boundary rays are antipodal, so no diameter can
align with the slice boundaries: every cut must be a radius, and `n`
radius cuts are needed. For even `n`, the `n` boundary rays pair up into
`n / 2` diameters, and `n / 2` cuts suffice — one full cut through the
middle produces two slices, so half as many cuts as slices.

The single remaining case is `n = 1`: the whole circle is already one
slice, so no cut is needed at all. Every other case is answered by the
parity test, in constant time regardless of `n`.

**Complexity:** `O(1)` time, `O(1)` space.
