import heapq


class FoodRatings:
    def __init__(self, foods: list[str], cuisines: list[str], ratings: list[int]) -> None:
        self.info: dict[str, tuple[str, int]] = {}
        self.by_cuisine: dict[str, list[tuple[int, str]]] = {}
        for food, cuisine, rating in zip(foods, cuisines, ratings):
            self.info[food] = (cuisine, rating)
            # The min of (-rating, name) is exactly the required winner:
            # highest rating first, ties to the smaller name.
            self.by_cuisine.setdefault(cuisine, []).append((-rating, food))
        for heap in self.by_cuisine.values():
            heapq.heapify(heap)

    def changeRating(self, food: str, newRating: int) -> None:
        # Lazy deletion: push a fresh entry and leave the outdated one in the
        # heap as garbage; only the info map holds the current rating.
        cuisine, _ = self.info[food]
        self.info[food] = (cuisine, newRating)
        heapq.heappush(self.by_cuisine[cuisine], (-newRating, food))

    def highestRated(self, cuisine: str) -> str:
        heap = self.by_cuisine[cuisine]
        while heap:
            rating, food = heap[0]
            # An entry is stale when its rating disagrees with the food's
            # current rating; a valid top is peeked, never consumed.
            if self.info[food][1] == -rating:
                return food
            heapq.heappop(heap)
        return ""
