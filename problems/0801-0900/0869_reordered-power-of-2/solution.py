class Solution:
    def reorderedPowerOf2(self, n: int) -> bool:
        # Reordering only permutes digits, so the answer is an inventory
        # match: count how many of each digit 0..9 n holds, then walk the
        # powers of two up to the bound n <= 10^9 admits — 2^0 through
        # 2^29 = 536870912 — and compare inventories. A match is always
        # reachable: the power itself is one of the legal reorderings.
        counts = [0] * 10
        m = n
        while m:
            counts[m % 10] += 1
            m //= 10
        p = 1
        while p <= 1_000_000_000:
            power_counts = [0] * 10
            m = p
            while m:
                power_counts[m % 10] += 1
                m //= 10
            if power_counts == counts:
                return True
            p *= 2
        return False
