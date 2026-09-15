from array import array
from typing import List


class Solution:
    def countXorSubarrays(self, nums: List[int], k: int) -> int:
        # Prefix XOR turns subarrays into pairs: nums[i..j) has XOR
        # P[i] ^ P[j], so the answer counts prefix pairs i < j whose XOR
        # reaches k. Each prefix is inserted into a binary trie and then
        # queried against everything now in it, which counts every pair
        # exactly once at its right endpoint — plus the n+1 self-pairs
        # (XOR 0), which only qualify when k = 0 and are subtracted at
        # the end. The query walks bit 29..0 against k: at a 0-bit of k
        # every trie prefix taking the flipped branch already exceeds k,
        # and at a 1-bit only the flipped branch can still reach k.
        # Falling out of the walk leaves prefixes matching all 30 bits,
        # i.e. XOR == k, which still qualifies. 30 bits cover every
        # prefix: values are <= 10^9 < 2^30.
        n = len(nums)
        ch = array("i", [0, 0, 0])  # node i: ch[3i]/ch[3i+1] children, ch[3i+2] count
        ans = 0
        p = 0
        for j in range(n + 1):
            if j:
                p ^= nums[j - 1]
            node = 0
            for t in range(29, -1, -1):
                bit = (p >> t) & 1
                cur = 3 * node
                nxt = ch[cur + bit]
                if not nxt:
                    ch.extend((0, 0, 0))
                    nxt = len(ch) // 3 - 1
                    ch[cur + bit] = nxt
                ch[3 * nxt + 2] += 1
                node = nxt
            node = 0
            for t in range(29, -1, -1):
                bit = (p >> t) & 1
                cur = 3 * node
                flip = ch[cur + (bit ^ 1)]
                if (k >> t) & 1:
                    if not flip:
                        break
                    node = flip
                else:
                    if flip:
                        ans += ch[3 * flip + 2]
                    same = ch[cur + bit]
                    if not same:
                        break
                    node = same
            else:
                ans += ch[3 * node + 2]
        return ans - (n + 1 if k == 0 else 0)
