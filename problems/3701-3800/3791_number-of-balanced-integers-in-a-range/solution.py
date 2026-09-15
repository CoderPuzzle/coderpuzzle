class Solution:
    def countBalanced(self, low: int, high: int) -> int:
        def count_up_to(x: int) -> int:
            if x < 10:
                return 0
            s = str(x)
            n = len(s)
            span = 9 * n
            size = 2 * span + 1
            # ways[i][t + span]: assignments of slots i..n-1 with free digits
            # 0..9 whose signed sum is t (slot j contributes +digit when j is
            # even and -digit when j is odd, 0-based from the left).
            ways = [[0] * size for _ in range(n + 1)]
            ways[n][span] = 1
            for i in range(n - 1, -1, -1):
                sign = 1 if i % 2 == 0 else -1
                row = ways[i]
                nxt = ways[i + 1]
                for t in range(-span, span + 1):
                    total = 0
                    for d in range(10):
                        u = t - sign * d
                        if -span <= u <= span:
                            total += nxt[u + span]
                    row[t + span] = total
            count = 0
            diff = 0
            for i, ch in enumerate(s):
                v = ord(ch) - 48
                sign = 1 if i % 2 == 0 else -1
                row = ways[i + 1]
                # A digit below x's own fixes a smaller prefix forever, so
                # the freed tail counts whenever it can cancel the running
                # difference; x's digit itself keeps the walk tight.
                for c in range(v):
                    u = -diff - sign * c
                    if -span <= u <= span:
                        count += row[u + span]
                diff += sign * v
            if diff == 0:
                count += 1
            # Padding with leading zeros preserves "alternating sum is
            # zero" exactly for balanced numbers, but lets m = 0 slip in;
            # it is the only non-balanced value ever counted, so drop it.
            return count - 1

        return count_up_to(high) - count_up_to(low - 1)
