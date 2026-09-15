from collections import deque
from typing import List, Optional


class Solution:
    def maxXor(self, nums: List[int], k: int) -> int:
        # Bounds: nums[i] < 2^15 and XOR never widens a value, so every
        # prefix xor, subarray value, and the answer stay below 2^15: 15
        # trie levels (bit 14 down to bit 0) cover the universe.
        n = len(nums)
        pref = [0] * (n + 1)
        for i, v in enumerate(nums):
            pref[i + 1] = pref[i] ^ v
        size = 15 * n + 1
        child = [-1] * (2 * size)  # children of node j: child[2j], child[2j+1]
        cnt = [0] * size
        nodes = 1  # next free node id; node 0 is the root
        max_q = deque()  # indices of max candidates, values decreasing
        min_q = deque()  # indices of min candidates, values increasing
        left = 0
        best = 0
        for right, x in enumerate(nums):
            while max_q and nums[max_q[-1]] <= x:
                max_q.pop()
            max_q.append(right)
            while min_q and nums[min_q[-1]] >= x:
                min_q.pop()
            min_q.append(right)
            # Valid starts are exactly [left, right]: shrink from the left
            # while the window spread exceeds k, retiring pref[left] from
            # the trie as each start index leaves. A single element has
            # spread 0 <= k, so the loop always stops.
            while nums[max_q[0]] - nums[min_q[0]] > k:
                if max_q[0] == left:
                    max_q.popleft()
                if min_q[0] == left:
                    min_q.popleft()
                v = pref[left]
                node = 0
                cnt[0] -= 1
                for b in range(14, -1, -1):
                    node = child[2 * node + ((v >> b) & 1)]
                    cnt[node] -= 1
                left += 1
            # Insert pref[right]: start index right becomes eligible.
            v = pref[right]
            node = 0
            cnt[0] += 1
            for b in range(14, -1, -1):
                slot = 2 * node + ((v >> b) & 1)
                nxt = child[slot]
                if nxt < 0:
                    nxt = nodes
                    nodes += 1
                    child[slot] = nxt
                node = nxt
                cnt[node] += 1
            # Best subarray ending at right: max pref[right + 1] ^ pref[l]
            # over l in [left, right]. Greedy walk, preferring the child
            # whose bit differs from pref[right + 1] (setting the result
            # bit) while that branch is alive (nonempty count).
            q = pref[right + 1]
            node = 0
            cur = 0
            for b in range(14, -1, -1):
                d = (q >> b) & 1
                nxt = child[2 * node + (d ^ 1)]
                if nxt >= 0 and cnt[nxt] > 0:
                    cur |= 1 << b
                    node = nxt
                else:
                    node = child[2 * node + d]
            if cur > best:
                best = cur
        return best
