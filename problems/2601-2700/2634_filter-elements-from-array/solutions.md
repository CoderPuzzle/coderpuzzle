# Solutions — Filter Elements from Array

## Manual walk with truthiness gate

The filtered array is built by a single explicit loop over `filterCase.arr`.
For every index i the code calls `fn(arr[i], i)` — always passing the
element and its index positionally, whether or not the particular fn
declares them — and pushes `arr[i]` onto the result only when that call's
return value tests truthy, which is exactly what `Boolean(value)` would
report. The array is appended to in index order, so relative order of the
survivors can never drift from the input.

The truthiness gate is what makes non-boolean fns work without any extra
conversion: a bare `return;` (undefined), `NaN`, an empty string, `false`,
and the numeric zero produced by Example 3's `plusOne` all coerce to false,
so their elements drop, while everything else — including objects and the
string `"0"` — coerces to true and stays. No branch special-cases any type;
the plain `if (...)` performs the coercion by itself, mirroring the hint's
"if-statements don't need to be booleans" observation.

The built-in `Array.prototype.filter` is never touched; the whole job is
one pass with O(1) work per element, and the output buffer holds at most
`arr.length` numbers.

**Complexity:** `O(n)` time, `O(n)` space, where `n` is `arr.length`.
