class Solution:
    def maxPotholes(self, road: str, budget: int) -> int:
        # Whole long runs are cheapest per pothole (L / (L + 1) grows with L),
        # so take longest runs first; when a full run no longer fits only one
        # partial purchase remains, worth budget - 1 potholes.
        fixed = 0
        lengths = sorted((len(run) for run in road.split(".") if run), reverse=True)
        for length in lengths:
            if budget >= length + 1:
                budget -= length + 1
                fixed += length
            else:
                fixed += max(0, budget - 1)
                break
        return fixed
