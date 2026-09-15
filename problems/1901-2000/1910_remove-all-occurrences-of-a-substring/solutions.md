# Solutions — Remove All Occurrences of a Substring

The repeated leftmost removal only ever interacts with the string at one
place — the seam where the removal happens — so the whole simulation
collapses into a single left-to-right stream through a stack.

## Stream through a survivor stack

Feed `s` one character at a time onto a stack of surviving characters.
After each push, check whether the top `len(part)` characters spell out
`part`; when they do, pop them. This mirrors the leftmost-first process:
any occurrence the statement's loop would find either lies entirely ahead
of the stream (not pushed yet) or ends exactly at the current top — an
occurrence ending earlier would already have been popped when its last
character landed.

The stack also reproduces the chain reactions for free. A match must end
at a freshly pushed character, because the stack was occurrence-free
before that push — so checking the top `m` characters once per push, with
no inner loop, is enough to catch every removal, including ones that only
become visible after a pop exposes older characters. In `"aabcbc"` with
`part = "abc"`, the first pop leaves `"abc"`, and the `c` that completes
it triggers the second removal on its own push. When the stream ends, the
stack is the irreducible remainder, so joining it is the answer.

**Complexity:** `O(n · m)` time (each of the `n` pushes compares at most
`m` characters; `n · m <= 10^6` under the constraints), `O(n)` space.
