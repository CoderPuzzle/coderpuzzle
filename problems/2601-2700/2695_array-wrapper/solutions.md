# Solutions — Array Wrapper

Both judged behaviors ride on JavaScript's built-in conversion protocol,
so the wrapper itself stays tiny: the constructor stores the array, and
everything else is a matter of hooking the right protocol method.

## Hooking the Primitive and String Conversions

The constructor keeps its argument as `nums`. Adding two wrappers with +
asks both operands for a primitive first — `valueOf` runs on each side
before any arithmetic — so implementing `valueOf` as a plain reduction of
the stored elements (seeded with 0) makes every addition produce exactly
the combined element total. Chained additions inherit this correctness:
integer summing is associative, and once the accumulator becomes a number,
adding it to the next instance still triggers that instance's `valueOf`,
so folding left-to-right over any number of instances matches what the
spec promises. The magnitudes stay trivially exact, too — a thousand
elements capped at 1000 each sum well below 2⁵³, far inside Number's safe
range.

String() (and template interpolation) goes through `toString`, which joins
the stored elements with commas inside literal brackets — `[1,2,3]`. The
empty array needs no special case because an empty join renders `""`,
leaving the bare brackets `"[]"`. The judged entry point then just wires
the case up: map `.arrays` through the constructor, return `String(...)`
of the single instance for a `"String"` operation, and for `"Add"` fold
the instances together left-to-right with the real `+` operator.

**Complexity:** `O(n)` time, `O(1)` space.
