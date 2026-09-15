class Solution:
    def countSubstrings(self, s: str, t: str) -> int:
        # same[j] = length of the run of exact matches ending at s[i-1], t[j-1].
        # diff[j] = length of the run ending there with exactly one mismatch,
        # counted directly (not merely bounded) because the mismatch count
        # along any fixed pair of starts is monotone non-decreasing: once a
        # second mismatch would appear, extending further only adds more.
        n, m = len(s), len(t)
        same_prev = [0] * (m + 1)
        diff_prev = [0] * (m + 1)
        total = 0
        for i in range(1, n + 1):
            same_curr = [0] * (m + 1)
            diff_curr = [0] * (m + 1)
            for j in range(1, m + 1):
                if s[i - 1] == t[j - 1]:
                    # A matching pair of last characters carries the counts
                    # from the diagonal forward unchanged: a zero-mismatch
                    # run stays zero-mismatch, a one-mismatch run stays
                    # one-mismatch.
                    same_curr[j] = same_prev[j - 1] + 1
                    diff_curr[j] = diff_prev[j - 1]
                else:
                    # This position is itself the single mismatch, so it can
                    # only extend back through a run that was perfectly
                    # matching before it.
                    same_curr[j] = 0
                    diff_curr[j] = same_prev[j - 1] + 1
                total += diff_curr[j]
            same_prev, diff_prev = same_curr, diff_curr
        return total
