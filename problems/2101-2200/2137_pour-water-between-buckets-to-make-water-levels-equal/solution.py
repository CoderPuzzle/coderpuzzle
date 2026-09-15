class Solution:
    def equalizeWater(self, buckets: List[int], loss: int) -> float:
        low = 0.0
        high = float(max(buckets))
        retained = (100 - loss) / 100
        for _ in range(100):
            middle = (low + high) / 2
            needed = sum(middle - water for water in buckets if water < middle)
            available = sum(water - middle for water in buckets if water >= middle)
            if available * retained >= needed:
                low = middle
            else:
                high = middle
        return low
