class Solution:
    def distanceBetweenBusStops(self, distance: List[int], start: int, destination: int) -> int:
        # Order the stops: edge i leads from stop i to stop i+1, so the
        # clockwise arc between them uses exactly the entries in between.
        lo, hi = min(start, destination), max(start, destination)
        clockwise = sum(distance[lo:hi])
        total = sum(distance)
        return min(clockwise, total - clockwise)
