# Solutions — Dinner Plate Stacks

## Heap of Vacant Indices

The stacks themselves are just an array of arrays — `pop` trims trailing
empty rows off the tail so the rightmost non-empty stack stays on top. The
difficulty is entirely in `push`: finding the leftmost stack with room
without paying for a scan across every row each time.

A min-heap of candidate indices does exactly that. Whenever a stack loses a
plate — through `popAtStack`, or a `pop` that drains the tail — its index is
pushed onto the heap. A `push` pops entries until the top of the heap names
a real, still-hungry stack: indices past the trimmed end are stale (their
rows were removed by the trim), and full stacks are stale too. Duplicates
are harmless because each entry is re-validated at pop time. The first
surviving index is the leftmost vacant stack; after placing the plate it
stays on the heap only while room remains. When no entry survives, either
the tail row still has room — making it the leftmost vacant by definition,
since no hole exists left of it — or a fresh row is appended.

`popAtStack` on an empty or absent index answers `-1` directly. Every
operation touches one heap position at most: amortized logarithmic despite
the adversarial hole-punching sequences the constraints allow.

**Complexity:** each call runs in amortized `O(log n)` heap work with `n`
calls so far; storage is linear in plates held.
