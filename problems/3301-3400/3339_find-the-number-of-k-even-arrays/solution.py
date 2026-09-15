class Solution:
    def countOfArrays(self, n: int, m: int, k: int) -> int:
        # (arr[i] * arr[i+1]) - arr[i] - arr[i+1] = (arr[i]-1) *
        # (arr[i+1]-1) - 1, which is even exactly when BOTH neighbors are
        # even — so k-even means exactly k adjacent pairs have both
        # elements even. With E = m // 2 even values and O = m - E odd
        # values, track per length i, for each pair count j, how many
        # arrays end in an even value and how many end in an odd one.
        # Extending by an even value (E choices) lifts an even-ending
        # j-1-pair state to j pairs and leaves odd-ending states in place;
        # extending by an odd value (O choices) never changes the count.
        # Entries stay below MOD; each join is a two-term sum times at
        # most 500, and the running totals stay far below 2^53.
        MOD = 1_000_000_007
        even, odd = m // 2, m - m // 2
        end_even = [even] + [0] * (n - 1)
        end_odd = [odd] + [0] * (n - 1)
        for _ in range(n - 1):
            shifted = [0] + end_even[:-1]
            nxt_even = [(s + o) * even % MOD for s, o in zip(shifted, end_odd)]
            nxt_odd = [(e + o) * odd % MOD for e, o in zip(end_even, end_odd)]
            end_even, end_odd = nxt_even, nxt_odd
        return (end_even[k] + end_odd[k]) % MOD
