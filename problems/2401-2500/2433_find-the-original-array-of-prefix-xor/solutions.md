# Solutions — Find The Original Array of Prefix Xor

## Adjacent Prefix XOR

The prefix relation `pref[i] = arr[0] ^ ... ^ arr[i]` and its neighbor
`pref[i-1] = arr[0] ^ ... ^ arr[i-1]` differ by exactly the term
`arr[i]`, so xoring the two equations collapses every shared prefix and
leaves `arr[i] = pref[i] ^ pref[i-1]`. This is hint 1's equation
`x ^ a = b`: xoring both sides with `a` isolates x, because xor is its own
inverse and cancels itself. With `arr[0] = pref[0]` the whole original
array falls out of one linear pass — no search, no ambiguity, which is
what "the answer is unique" guarantees.

The pass writes into a fresh output array. An in-place variant is
tempting — but it must walk **backward**, because writing position `i`
consumes `pref[i-1]` and only a high-to-low sweep keeps that neighbor at
its original value when read; a forward in-place sweep xors each element
against an already-transformed one and produces garbage after index 1.
Returning a new array sidesteps that ordering trap entirely (and never
disturbs the caller's input, which the judge re-reads).

Every value stays below `2²⁰`, and xor never widens values, so 32-bit
integers suffice in all seven languages with no overflow analysis needed.
Each element is touched once with constant work.

**Complexity:** `O(n)` time, `O(1)` extra space beyond the output.
