class Solution:
    def reachNumber(self, target: int) -> int:
        # Reversing every move maps a path to target onto a path to
        # -target, so only |target| matters. Walking right for k moves
        # lands on the triangular sum T = k(k+1)/2; flipping move i to the
        # left lowers the total by exactly 2i, so an even overshoot
        # T - |target| is repaired without extra moves while an odd one
        # never is. Take the first k whose T reaches |target| with an even
        # overshoot — advancing k one step adds k+1 to T, flipping parity
        # within at most two steps.
        t = abs(target)
        k = 1
        total = 1
        while total < t or (total - t) % 2 != 0:
            k += 1
            total += k
        return k
