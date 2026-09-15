class Solution:
    def gcdOfOddEvenSums(self, n: int) -> int:
        # Closed forms: the first n odds sum to n * n (pairs around the
        # middle total 2n), the first n evens sum to n * (n + 1). Factoring
        # out the shared n leaves gcd(n, n + 1) = 1 — consecutive integers
        # are coprime — so the answer collapses to n itself.
        return n
