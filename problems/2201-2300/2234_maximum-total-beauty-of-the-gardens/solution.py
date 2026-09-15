import bisect


class Solution:
    def maximumBeauty(self, flowers: List[int], newFlowers: int, target: int, full: int, partial: int) -> int:
        flowers.sort()
        n = len(flowers)
        prefix = [0] * (n + 1)
        for i, count in enumerate(flowers):
            prefix[i + 1] = prefix[i] + count

        # Cost to raise every garden among the first m (sorted ascending) up
        # to `level`: only those below `level` need planting.
        def cost_to_level(m: int, level: int) -> int:
            pos = bisect.bisect_left(flowers, level, 0, m)
            return level * pos - prefix[pos]

        best = 0
        budget = newFlowers
        for complete in range(n + 1):
            if complete > 0:
                need = max(0, target - flowers[n - complete])
                if budget < need:
                    break
                budget -= need
            rest = n - complete
            if rest == 0:
                best = max(best, complete * full)
                break
            if flowers[rest - 1] >= target:
                # every remaining garden is already complete; that split is
                # dominated by completing all of them for free.
                continue
            # Highest reachable minimum among the remaining gardens.
            low, high = flowers[0], target - 1
            best_min = flowers[0]
            while low <= high:
                mid = (low + high) // 2
                if cost_to_level(rest, mid) <= budget:
                    best_min = mid
                    low = mid + 1
                else:
                    high = mid - 1
            best = max(best, complete * full + best_min * partial)
        return best
