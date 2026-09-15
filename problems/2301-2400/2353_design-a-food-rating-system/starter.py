from typing import List, Optional


class FoodRatings:
    def __init__(self, foods: List[str], cuisines: List[str], ratings: List[int]):
        raise NotImplementedError("TODO")

    def changeRating(self, food: str, newRating: int):
        raise NotImplementedError("TODO")

    def highestRated(self, cuisine: str) -> str:
        raise NotImplementedError("TODO")
