from typing import List


class MyHashSet:
    """A fixed array of 769 buckets: key % 769 selects the bucket, and the
    bucket's short list holds exactly the keys that hashed there. add()
    appends only when the key is absent (a duplicate add is a no-op),
    remove() deletes only when the key is present (removing an absent key
    does nothing), and contains() scans the one bucket.
    """

    def __init__(self) -> None:
        self.buckets: List[List[int]] = [[] for _ in range(769)]

    def add(self, key: int) -> None:
        bucket = self.buckets[key % 769]
        if key not in bucket:
            bucket.append(key)

    def remove(self, key: int) -> None:
        bucket = self.buckets[key % 769]
        if key in bucket:
            bucket.remove(key)

    def contains(self, key: int) -> bool:
        return key in self.buckets[key % 769]
