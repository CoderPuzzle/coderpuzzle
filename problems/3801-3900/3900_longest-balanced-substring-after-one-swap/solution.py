from collections import defaultdict, deque


class Solution:
    def longestBalanced(self, s: str) -> int:
        def longest_with_delta(target: int, cap: int) -> int:
            prefix = [0] * (len(s) + 1)
            positions = defaultdict(deque)
            positions[0].append(0)
            best = 0
            for right, ch in enumerate(s, 1):
                prefix[right] = prefix[right - 1] + (1 if ch == "1" else -1)
                expired = right - cap - 1
                if expired >= 0:
                    queue = positions[prefix[expired]]
                    if queue and queue[0] == expired:
                        queue.popleft()
                queue = positions[prefix[right] - target]
                if queue:
                    best = max(best, right - queue[0])
                positions[prefix[right]].append(right)
            return best

        zeros = s.count("0")
        ones = len(s) - zeros
        return max(
            longest_with_delta(0, len(s)),
            longest_with_delta(2, 2 * zeros),
            longest_with_delta(-2, 2 * ones),
        )
