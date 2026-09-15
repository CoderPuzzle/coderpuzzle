class Solution:
    def maxA(self, n: int) -> int:
        # best[i]: the most 'A's i presses can leave on screen. Press i is
        # either one more printed A, or the last paste after a Ctrl-A /
        # Ctrl-C pair taken at press j: the pair captures best[j] and the
        # pastes multiply it, giving the candidate best[j] * (i - j - 1).
        # j runs only to i - 3, since a pair must leave room for one paste.
        best = [0] * (n + 1)
        for i in range(1, n + 1):
            best[i] = best[i - 1] + 1
            for j in range(1, i - 2):
                # i - j - 1 copies in all: the one already on screen plus
                # one for every paste.
                best[i] = max(best[i], best[j] * (i - j - 1))
        return best[n]
