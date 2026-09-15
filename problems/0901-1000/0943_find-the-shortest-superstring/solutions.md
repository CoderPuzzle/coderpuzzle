# Solutions — Find the Shortest Superstring

## Overlap Bitmask DP (Hamiltonian Path)

An optimal superstring lays the words out in some order, merging each adjacent pair by their maximum overlap — the longest suffix of one word equal to a prefix of the next. Precomputing `overlap[i][j]` for every ordered pair, by trying every overlap length up to the shorter word and keeping the largest match, reduces the task to finding the order that maximizes total overlap. That is a shortest Hamiltonian path over the words, where traversing `i -> j` costs `len(words[j]) - overlap[i][j]`.

With `k` words of maximum length `L` and `k <= 12`, the path is found by bitmask DP: `dp[mask][j]` holds the best superstring covering the words in `mask` and ending at `j`, stored as a `(length, string, index-sequence)` triple. Transitions append an unused word `nxt` to each reachable state, extending the stored string by the non-overlapping suffix; states compare by length first, then by index sequence, so ties resolve deterministically and the final minimum over `dp[full][j]` returns a specific shortest superstring rather than just its length.

Storing full strings in the states trades memory for a trivial reconstruction — no parent pointers are needed. Each of the at most `2^k * k^2` transitions copies a string of up to `k*L` characters, which dominates the `O(k^2 L^2)` overlap precomputation but remains comfortably fast at these constraints.

**Complexity:** `O(2^k · k^3 · L)` time, `O(2^k · k^2 · L)` space.
