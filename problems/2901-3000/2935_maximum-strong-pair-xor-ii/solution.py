from typing import List


class Solution:
    def maximumStrongPairXor(self, nums: List[int]) -> int:
        # Sorted sweep with a sliding window [ceil(y/2), y]: a binary trie
        # over the 20 value bits, each node carrying a count of live window
        # values, answers "best XOR partner of y in the window" greedily.
        # The left pointer retires values whose doubling falls below y.
        nums.sort()
        BITS = 20  # nums[i] <= 2^20 - 1
        child = [[0, 0]]  # node 0 is the root; 0 means "no child"
        cnt = [0]
        best = 0
        left = 0
        for y in nums:
            # insert y
            node = 0
            for b in range(BITS - 1, -1, -1):
                d = (y >> b) & 1
                nxt = child[node][d]
                if nxt == 0:
                    child.append([0, 0])
                    cnt.append(0)
                    nxt = len(child) - 1
                    child[node][d] = nxt
                node = nxt
                cnt[node] += 1
            # retire x from the left while 2 * x < y (window is [ceil(y/2), y])
            while 2 * nums[left] < y:
                x = nums[left]
                node = 0
                for b in range(BITS - 1, -1, -1):
                    node = child[node][(x >> b) & 1]
                    cnt[node] -= 1
                left += 1
            # query: greedily take the opposite bit when that subtree is live
            node = 0
            res = 0
            for b in range(BITS - 1, -1, -1):
                d = (y >> b) & 1
                want = child[node][d ^ 1]
                if want != 0 and cnt[want] > 0:
                    res |= 1 << b
                    node = want
                else:
                    node = child[node][d]
            if res > best:
                best = res
        return best
