from typing import List


class MyHashMap:
    """A fixed array of 1009 buckets -- 1009 is prime, so key patterns that
    repeat modulo a small number do not all pile into one bucket -- each
    holding a small list of [key, value] pairs. A key's remainder picks its
    bucket, and put, get and remove each scan that bucket alone: put
    replaces the value of an existing pair in place (never a duplicate),
    get returns the stored value or -1, and remove deletes the pair when
    present.
    """

    SIZE = 1009

    def __init__(self) -> None:
        self.buckets: List[List[List[int]]] = [[] for _ in range(MyHashMap.SIZE)]

    def put(self, key: int, value: int) -> None:
        bucket = self.buckets[key % MyHashMap.SIZE]
        for pair in bucket:
            if pair[0] == key:
                pair[1] = value
                return
        bucket.append([key, value])

    def get(self, key: int) -> int:
        for stored, value in self.buckets[key % MyHashMap.SIZE]:
            if stored == key:
                return value
        return -1

    def remove(self, key: int) -> None:
        bucket = self.buckets[key % MyHashMap.SIZE]
        for index, pair in enumerate(bucket):
            if pair[0] == key:
                bucket.pop(index)
                return
