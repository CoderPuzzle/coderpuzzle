import heapq


class MovieRentingSystem:
    def __init__(self, n: int, entries: list[list[int]]) -> None:
        self.price: dict[tuple[int, int], int] = {}
        self.unrented: dict[int, list[tuple[int, int, int]]] = {}  # movie -> (price, shop, token)
        self.unrented_token: dict[tuple[int, int], int] = {}  # (movie, shop) -> live token
        self.rented: list[tuple[int, int, int, int]] = []  # (price, shop, movie, token)
        self.rented_token: dict[tuple[int, int], int] = {}  # (shop, movie) -> live token
        self.serial = 0
        for shop, movie, price in entries:
            self.price[(shop, movie)] = price
            self.serial += 1
            self.unrented_token[(movie, shop)] = self.serial
            self.unrented.setdefault(movie, []).append((price, shop, self.serial))

        for heap in self.unrented.values():
            heapq.heapify(heap)

    def search(self, movie: int) -> list[int]:
        heap = self.unrented.get(movie, [])
        result: list[int] = []
        kept: list[tuple[int, int, int]] = []
        while heap and len(result) < 5:
            price, shop, token = heapq.heappop(heap)
            if self.unrented_token.get((movie, shop)) != token:
                continue  # stale entry from a rent/drop cycle
            result.append(shop)
            kept.append((price, shop, token))
        for entry in kept:
            heapq.heappush(heap, entry)
        return result

    def rent(self, shop: int, movie: int) -> None:
        del self.unrented_token[(movie, shop)]
        self.serial += 1
        self.rented_token[(shop, movie)] = self.serial
        heapq.heappush(self.rented, (self.price[(shop, movie)], shop, movie, self.serial))

    def drop(self, shop: int, movie: int) -> None:
        del self.rented_token[(shop, movie)]
        self.serial += 1
        self.unrented_token[(movie, shop)] = self.serial
        heapq.heappush(
            self.unrented.setdefault(movie, []),
            (self.price[(shop, movie)], shop, self.serial),
        )

    def report(self) -> list[list[int]]:
        result: list[list[int]] = []
        kept: list[tuple[int, int, int, int]] = []
        while self.rented and len(result) < 5:
            price, shop, movie, token = heapq.heappop(self.rented)
            if self.rented_token.get((shop, movie)) != token:
                continue
            result.append([shop, movie])
            kept.append((price, shop, movie, token))
        for entry in kept:
            heapq.heappush(self.rented, entry)
        return result
