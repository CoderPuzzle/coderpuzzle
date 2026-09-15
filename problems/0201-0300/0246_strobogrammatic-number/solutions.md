# Solutions — Strobogrammatic Number

## Rotation map, two pointers

A 180-degree turn reverses the digit order and replaces every digit with its
rotation, and only five digits survive that turn at all: `0`, `1`, and `8`
rotate to themselves, while `6` and `9` rotate to each other. That turns the
definition into a purely local test — the digit at each position must be
exactly the rotation of the digit standing opposite it, and any digit outside
the five, such as `2` or `5`, can never appear anywhere.

Two pointers walk inward from both ends carrying out that test. At each step
the left digit is looked up in the rotation map; a digit missing from the map
settles the answer `false` on the spot, otherwise the mapped digit is compared
with the right one. A mismatch is likewise immediate, since no later pair can
repair it; when a pair agrees, both pointers step inward.

When the length is odd the pointers meet on the middle digit, which is paired
with itself — so it must be one of the self-rotating `0`, `1`, `8`, and a
middle `6` or `9` fails exactly like a digit that does not rotate at all. The
loop ends with the pointers crossed, at which point every mirrored pair has
checked out and the answer is `true`.

**Complexity:** `O(n)` time, `O(1)` space.
