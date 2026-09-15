# Solutions — Compact Object

One traversal rebuilds the whole structure, filtering each slot as it goes.

## Explicit-Stack Filter Copy

Rebuild the compact result from scratch instead of mutating obj: walk the
value tree with an explicit stack rather than recursion, because the
constraints admit a serialized form of up to 10⁶ characters and a chain
like `[[[[…]]]]` spends only two characters per level, so legal inputs can
nest tens of thousands deep — far past what call-stack recursion survives.
The root becomes a fresh array or object matching obj's own kind; popping
a (fresh container, source container) pair walks its slots either by index
for arrays or over the object's own enumerable keys, where `Object.keys`
suffices because the inputs are JSON.parse-shaped plain containers. Each
slot's value receives one of two fates.

The two fates encode the entire problem. A slot whose value is truthy —
including every container, since objects and arrays are always truthy even
when they end up empty, as Example 3's surviving `[]` shows — is written
into the fresh parent unchanged: in an object the original key rides along,
while an array survivor claims the parent's next free index. That write
index is what makes removal real on arrays — merely skipping indices would
leave `undefined` holes that serialize back to null — so dropped slots
shift later elements left instead, and the survivors keep their relative
order. Any other primitive (`false`, `null`, `0`, `""`) never gets a slot
in the result at all, which removes the entry wholesale; a primitive has no
sub-tree, so nothing behind it needs carrying over.

Containers therefore enter the fresh structure immediately as empty shells
and are pushed onto the stack as new pairs so their own slots receive
identical treatment, making the whole walk a single pass. Every value is
read once and copied once into an output graph no larger than the input,
so both cost bounds track the number of values in obj.

**Complexity:** `O(n)` time, `O(n)` space, where `n` is the number of
values in obj (bounded by `JSON.stringify(obj).length`).
