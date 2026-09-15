# Solutions — Inversion of Object

One pass over obj collects each value's originating keys into the inverted
object, emitting a lone key for unique values and a key array once a value
collides.

## Single-Pass Key Grouping

The sweep visits obj's own slots exactly once: `Object.keys` for an object,
decimal index strings for an array — since the indices are to be treated as
keys, slot i contributes under its string form `"i"`, which is precisely
what Example 3 shows. The constraint that every obj[key] is a string keeps
the structure flat (one level, no containers inside), so no recursion or
explicit stack is needed and no call depth can grow at all; a chain of n
slots costs one visit each, staying far inside the 10⁵-character bound of
JSON.stringify(obj).

The inversion is a grouping keyed by the string values themselves, held in
three states per distinct value. The first time a value is seen, its
originating key is stored directly, which serves the unique case as a plain
string (Example 1); meeting it a second time promotes that entry from the
lone key to the two-element list [firstKey, nextKey], and every further
collision appends in encounter order, reproducing Example 2's ["b", "c"].
An own-property check (`hasOwnProperty`) guards each lookup so names like
"constructor" on Object.prototype can never satisfy a miss, and because
every value is guaranteed to be a string, two different slots collide only
when their contents genuinely match — digit-shaped strings such as "0"
in Example 3 stay strings in both directions and never masquerade as array
indices.

Each slot does constant work plus an amortized O(1) append into its group,
and the groups' combined content is exactly the input's keys re-homed
under their values, so both bounds track the number of slots n (at most
one entry per character pair of serialized input).

**Complexity:** `O(n)` time, `O(n)` space.
