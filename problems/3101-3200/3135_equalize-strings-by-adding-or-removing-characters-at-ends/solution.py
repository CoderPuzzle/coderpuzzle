class Solution:
    def minOperations(self, initial: str, target: str) -> int:
        # Characters that survive form a contiguous window of initial and a
        # contiguous window of target, i.e. a common substring; every other
        # character costs exactly one operation, so the answer is
        # m + n - 2 * (longest common substring).
        best = 0
        prev = [0] * (len(target) + 1)
        for a in initial:
            cur = [0] * (len(target) + 1)
            for j, b in enumerate(target):
                if a == b:
                    cur[j + 1] = prev[j] + 1
                    if cur[j + 1] > best:
                        best = cur[j + 1]
            prev = cur
        return len(initial) + len(target) - 2 * best
