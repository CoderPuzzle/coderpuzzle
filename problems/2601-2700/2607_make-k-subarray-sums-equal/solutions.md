# Solutions — Make K-Subarray Sums Equal

## GCD Groups and Medians

Equal sums for all circular windows of length `k` force adjacent windows to agree: subtracting the window starting at `i` from the one starting at `i + 1` leaves `arr[(i + k) mod n] - arr[i] = 0`, so stepping by `k` around the cycle must always return the same value. The orbits of repeatedly adding `k` modulo `n` are exactly the residue classes modulo `g = gcd(n, k)`, and the condition is both necessary and sufficient: if every class holds one constant value, any window of `k` consecutive positions picks up each class exactly `k / g` times, making every window sum identical.

Equalizing a group of numbers with unit increments and decrements is cheapest around a median, so the code extracts each residue class `r, r + g, r + 2g, ...`, sorts it, and takes element `len(group) // 2` — for even-sized groups either middle element achieves the same minimal total. The cost of a class is the sum of `|v - median|` over its members.

Classes are independent because the window-sum constraint never couples two different residues, so the answer is just the sum of the per-class costs. Sorting the classes partitions all `n` elements, keeping the total work bounded by one global sort.

**Complexity:** `O(n log n)` time, `O(n)` space.
