class Solution:
    def minOperations(self, s: str, k: int) -> int:
        # Only the count z of zeros matters: an operation flips i of the
        # current zeros and k - i of the ones, moving z to z + k - 2 * i
        # for any legal i — one contiguous same-parity range per step.
        n = len(s)
        z = s.count("0")
        if z == 0:
            return 0

        def find(nxt, i):
            # Next unvisited slot at or after i; path-compresses on the way.
            root = i
            while nxt[root] != root:
                root = nxt[root]
            while nxt[i] != root:
                nxt[i], i = root, nxt[i]
            return root

        # BFS over zero counts 0..n toward 0. Two skip lists (one per
        # parity) hold the unvisited states, so each state enters the
        # queue exactly once even though edges are whole intervals.
        nxt_even = list(range(n // 2 + 2))
        nxt_odd = list(range((n + 1) // 2 + 1))
        dist = [-1] * (n + 1)
        dist[z] = 0
        start = z >> 1
        if z % 2 == 0:
            nxt_even[start] = start + 1
        else:
            nxt_odd[start] = start + 1
        queue = [z]
        head = 0
        while head < len(queue):
            cur = queue[head]
            head += 1
            lo = max(0, k - (n - cur))
            hi = min(k, cur)
            low = cur + k - 2 * hi
            high = cur + k - 2 * lo
            p = (cur + k) & 1
            nxt = nxt_even if p == 0 else nxt_odd
            d = dist[cur] + 1
            j = find(nxt, low >> 1)
            while j < len(nxt) - 1:
                v = 2 * j + p
                if v > high:
                    break
                dist[v] = d
                if v == 0:
                    return d
                nxt[j] = j + 1
                queue.append(v)
                j = find(nxt, j + 1)
        return -1
