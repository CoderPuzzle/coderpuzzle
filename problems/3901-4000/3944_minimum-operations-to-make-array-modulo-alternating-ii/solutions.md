# Solutions — Minimum Operations to Make Array Modulo Alternating II

Build remainder histograms for even and odd positions. A tripled histogram and prefix sums of counts and weighted indices evaluate the total circular distance to every target remainder in O(1). Combine each even target with the cheapest odd target having a different remainder.

## Circular-distance prefix sums

Build remainder histograms for even and odd positions. A tripled histogram and prefix sums of counts and weighted indices evaluate the total circular distance to every target remainder in O(1). Combine each even target with the cheapest odd target having a different remainder.

**Complexity:** `O(n+k) time, O(k) space`.
