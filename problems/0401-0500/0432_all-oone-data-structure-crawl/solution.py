from typing import Dict, Optional, Set


class _Bucket:
    """One count value and the keys currently held at it, threaded into
    the doubly-linked bucket list."""

    __slots__ = ("count", "keys", "prev", "next")

    def __init__(self, count: int) -> None:
        self.count = count
        self.keys: Set[str] = set()
        self.prev: Optional["_Bucket"] = None
        self.next: Optional["_Bucket"] = None


class AllOne:
    """A key-to-bucket map plus a doubly-linked list of count buckets in
    ascending order; every inc/dec walks its key exactly one bucket over,
    splicing the neighboring count in when it is missing and dropping
    buckets that empty out, so the extremes sit at the list's ends.
    """

    def __init__(self) -> None:
        self.key_bucket: Dict[str, _Bucket] = {}
        self.head = _Bucket(0)  # sentinel below every real count
        self.tail = _Bucket(0)  # sentinel above every real count
        self.head.next = self.tail
        self.tail.prev = self.head

    @staticmethod
    def _insert_after(anchor: "_Bucket", count: int) -> "_Bucket":
        bucket = _Bucket(count)
        bucket.prev, bucket.next = anchor, anchor.next
        anchor.next.prev = bucket
        anchor.next = bucket
        return bucket

    @staticmethod
    def _drop(bucket: "_Bucket") -> None:
        bucket.prev.next = bucket.next
        bucket.next.prev = bucket.prev

    def inc(self, key: str) -> None:
        old = self.key_bucket.get(key)
        anchor = self.head if old is None else old
        count = 1 if old is None else old.count + 1
        # The needed count is exactly one past the anchor's, so only its
        # immediate successor can already hold it.
        bucket = anchor.next
        if bucket.count != count:
            bucket = self._insert_after(anchor, count)
        bucket.keys.add(key)
        self.key_bucket[key] = bucket
        if old is not None:
            old.keys.discard(key)
            if not old.keys:
                self._drop(old)

    def dec(self, key: str) -> None:
        old = self.key_bucket.pop(key)  # the statement guarantees presence
        if old.count > 1:
            count = old.count - 1
            bucket = old.prev
            if bucket.count != count:
                bucket = self._insert_after(old.prev, count)
            bucket.keys.add(key)
            self.key_bucket[key] = bucket
        old.keys.discard(key)
        if not old.keys:
            self._drop(old)

    def getMaxKey(self) -> str:
        bucket = self.tail.prev
        if bucket is self.head:
            return ""
        # Several keys may share the top count; the lexicographically
        # smallest of them is the pinned answer.
        return min(bucket.keys)

    def getMinKey(self) -> str:
        bucket = self.head.next
        if bucket is self.tail:
            return ""
        return min(bucket.keys)
