from typing import Dict


class MapSum:
    """A plain key -> value hash map: no nodes, no per-insert maintenance.

    insert() stores the pair and stops -- the map carries no structure beyond
    the pairs themselves -- and sum() pays for that at query time,
    scanning every stored key and summing the values of those that start
    with the prefix.
    """

    def __init__(self) -> None:
        self.values: Dict[str, int] = {}

    def insert(self, key: str, val: int) -> None:
        self.values[key] = val

    def sum(self, prefix: str) -> int:
        total = 0
        for key, val in self.values.items():
            if key.startswith(prefix):
                total += val
        return total
