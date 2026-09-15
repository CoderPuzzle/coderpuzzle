# Solutions — String Transforms Into Another String

## One mapping per source letter, and a spare letter to break cycles

Each character of `str1` must end up as exactly one character of `str2`, and
a conversion hits **every** occurrence at once, so the correspondence forced
by the two strings is a partial function: one scan builds `map[a] = b`, and
a second disagreement on the same source letter makes the transformation
impossible immediately.

What remains is cycles. The conversions `a -> b`, `b -> a` cannot be applied
in either order — each would clobber the other's input — unless some letter
**outside** the mapping is available as a temporary: route `a` to the spare,
then `b` to `a`, then the spare to `b`. Such a spare letter exists exactly
when some letter never appears in `str2`: it can never be a target, so
converting into it destroys nothing. If `str2` uses all 26 letters, every
letter is someone's target and no spare exists. The one exception is the
identity transform: `str1 == str2` needs no conversions at all, cycles or
not.

So the answer is: equal strings, or a functional mapping whose target set
leaves at least one letter unused.

**Complexity:** `O(n)` time for the two scans and `O(1)` space — the mapping
holds at most 26 entries.
