class Solution:
    def earliestAcq(self, logs: list[list[int]], n: int) -> int:
        # Replay order first: the bisection asks prefix questions of the
        # chronologically sorted logs.
        sorted_events = sorted(logs)

        # Predicate for the bisection: does the prefix of the k soonest
        # logs already hold all n elements in one group?
        def connected(k: int) -> bool:
            parent = list(range(n))

            # Path-halving find keeps the trees shallow within one probe.
            def find(a: int) -> int:
                while parent[a] != a:
                    parent[a] = parent[parent[a]]
                    a = parent[a]
                return a

            # The component counter tracks the group count so no global scan
            # is ever needed.
            components = n
            for _, x, y in sorted_events[:k]:
                rx, ry = find(x), find(y)
                # Redundant (already-connected) logs merge nothing.
                if rx != ry:
                    parent[rx] = ry
                    components -= 1
            return components == 1

        # Links never disappear, so once connected always connected: the
        # predicate is monotone in k and the smallest true k can be bisected.
        m = len(sorted_events)
        if not connected(m):
            return -1
        lo, hi = 1, m
        while lo < hi:
            mid = (lo + hi) // 2
            if connected(mid):
                hi = mid
            else:
                lo = mid + 1
        # The last event of the surviving prefix carries the answer's moment.
        return sorted_events[lo - 1][0]
