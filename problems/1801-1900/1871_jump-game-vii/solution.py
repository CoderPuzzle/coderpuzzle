class Solution:
    def canReach(self, s: str, minJump: int, maxJump: int) -> bool:
        # Every reachable i contributes the interval [i+minJump, i+maxJump],
        # so "some source reaches j" is a range-count query; a rolling
        # prefix sum over reach[] answers it in O(1) per position.
        n = len(s)
        pre = [0] * (n + 1)
        pre[1] = 1  # index 0 is reachable by definition
        for i in range(1, n):
            lo = i - maxJump
            hi = i - minJump
            if s[i] == "0" and hi >= 0 and pre[hi + 1] - pre[max(lo, 0)] > 0:
                pre[i + 1] = pre[i] + 1
            else:
                pre[i + 1] = pre[i]
        return pre[n] > pre[n - 1]
