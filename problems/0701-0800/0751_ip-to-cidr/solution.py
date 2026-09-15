from typing import List, Optional


class Solution:
    def ipToCIDR(self, ip: str, n: int) -> List[str]:
        # A block of 2^k addresses must start at an address divisible by
        # 2^k, and may not overrun the remaining count. So the largest
        # block at the current address x is its lowest set bit (its own
        # alignment), halved down until it fits n; at address 0 nothing is
        # set, so the whole 2^32 space aligns and only n caps the block.
        x = 0
        for part in ip.split("."):
            x = x * 256 + int(part)
        result = []
        while n > 0:
            block = x & -x if x else 1 << 32
            while block > n:
                block >>= 1
            result.append(
                "{}.{}.{}.{}/{}".format(
                    (x >> 24) & 255, (x >> 16) & 255, (x >> 8) & 255, x & 255, 33 - block.bit_length()
                )
            )
            x += block
            n -= block
        return result
