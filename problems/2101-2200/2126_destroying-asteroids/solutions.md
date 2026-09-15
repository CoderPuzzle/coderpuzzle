# Solutions — Destroying Asteroids

## Absorb asteroids from smallest to largest

Sort the asteroids by mass. If the planet cannot absorb the smallest remaining asteroid, it cannot absorb any other remaining asteroid either. Otherwise, absorbing that asteroid only increases the planet's mass, so the greedy choice is always safe.

Use a 64-bit accumulator because the planet's final mass can exceed the 32-bit range.

**Complexity:** `O(n log n)` time and `O(n)` space for the language-level sort representation.
