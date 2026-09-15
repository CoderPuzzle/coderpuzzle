# Solutions — Undefined to Null

## Explicit-Stack Clone and Sweep

Walk the value with an explicit stack instead of recursion: the constraints
admit a serialized form of up to 10⁵ characters, and a chain like `[[[[…]]]]`
spends only two characters per level, so a legal input can nest tens of
thousands deep — far past what call-stack recursion survives. First
deep-copy the input with an explicit-stack walk of its own (every container
becomes a fresh array or plain object, scalars copied as-is), then sweep the
copy container by container: arrays position by position, objects over their
own enumerable keys. A slot holding `undefined` is overwritten with `null`;
any other container is pushed for the same treatment; every other value —
including pre-existing nulls — passes through untouched.

Two details carry the weight. Array-ness is tested before the generic object
branch, because arrays are objects too and would otherwise be swept by key
iteration with the wrong shape of work; and own-key iteration (`Object.keys`)
is sufficient because inputs are JSON.parse-shaped: plain containers whose
slots are all own data properties, with no inherited or symbolic keys to
filter out. Each value is visited once by the copy walk and once by the
sweep, and the copy doubles as the returned structure, so the footprint is
one new object graph the size of the input.

**Complexity:** `O(n)` time, `O(n)` space, where `n` is the number of values
and containers in obj.
