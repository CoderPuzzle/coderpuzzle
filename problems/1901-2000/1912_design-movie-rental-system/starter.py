from typing import List, Optional


class MovieRentingSystem:
    def __init__(self, n: int, entries: List[List[int]]):
        raise NotImplementedError("TODO")

    def search(self, movie: int) -> List[int]:
        raise NotImplementedError("TODO")

    def rent(self, shop: int, movie: int):
        raise NotImplementedError("TODO")

    def drop(self, shop: int, movie: int):
        raise NotImplementedError("TODO")

    def report(self) -> List[List[int]]:
        raise NotImplementedError("TODO")
