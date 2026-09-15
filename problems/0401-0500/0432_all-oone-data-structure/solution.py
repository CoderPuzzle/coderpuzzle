from typing import Dict, Optional


class _Node:
    __slots__ = ("key", "prev", "next", "bucket")

    def __init__(self, key: str) -> None:
        self.key = key
        self.prev: Optional["_Node"] = None
        self.next: Optional["_Node"] = None
        self.bucket: Optional["_Bucket"] = None


class _Bucket:
    """One count value: the keys currently at that count, threaded on a
    doubly linked list of count buckets in increasing order."""

    __slots__ = ("count", "head", "tail", "prev", "next")

    def __init__(self, count: int) -> None:
        self.count = count
        self.head = _Node("")  # sentinel before the first key
        self.tail = _Node("")  # sentinel after the last key
        self.head.next = self.tail
        self.tail.prev = self.head
        self.prev: Optional["_Bucket"] = None
        self.next: Optional["_Bucket"] = None


class AllOne:
    """Keys grouped into count buckets on a doubly linked list.

    The bucket after the head sentinel is the minimum count and the bucket
    before the tail sentinel is the maximum, so both getters read one
    pointer. `inc`/`dec` move a key between adjacent buckets, creating or
    deleting buckets as they fill or empty.
    """

    def __init__(self) -> None:
        self.nodes: Dict[str, _Node] = {}
        self.first = _Bucket(0)  # sentinel before the lowest count
        self.last = _Bucket(0)  # sentinel after the highest count
        self.first.next = self.last
        self.last.prev = self.first

    def _unlink_node(self, node: _Node) -> None:
        node.prev.next = node.next
        node.next.prev = node.prev

    def _push_node(self, bucket: _Bucket, node: _Node) -> None:
        tail = bucket.tail.prev
        node.prev = tail
        node.next = bucket.tail
        tail.next = node
        bucket.tail.prev = node
        node.bucket = bucket

    def _unlink_bucket(self, bucket: _Bucket) -> None:
        bucket.prev.next = bucket.next
        bucket.next.prev = bucket.prev

    def _add_bucket_after(self, anchor: _Bucket, bucket: _Bucket) -> None:
        following = anchor.next
        bucket.prev = anchor
        bucket.next = following
        anchor.next = bucket
        following.prev = bucket

    def _move(self, node: _Node, target: int, up: bool) -> None:
        old = node.bucket
        self._unlink_node(node)
        if up:
            neighbour = old.next
            if neighbour.count == target:
                bucket = neighbour
            else:
                bucket = _Bucket(target)
                self._add_bucket_after(old, bucket)
        else:
            neighbour = old.prev
            if neighbour.count == target:
                bucket = neighbour
            else:
                bucket = _Bucket(target)
                self._add_bucket_after(neighbour, bucket)
        self._push_node(bucket, node)
        if old.head.next is old.tail:
            self._unlink_bucket(old)

    def inc(self, key: str) -> None:
        node = self.nodes.get(key)
        if node is None:
            node = _Node(key)
            self.nodes[key] = node
            if self.first.next.count == 1:
                bucket = self.first.next
            else:
                bucket = _Bucket(1)
                self._add_bucket_after(self.first, bucket)
            self._push_node(bucket, node)
            return
        self._move(node, node.bucket.count + 1, up=True)

    def dec(self, key: str) -> None:
        node = self.nodes[key]
        if node.bucket.count == 1:
            self._unlink_node(node)
            if node.bucket.head.next is node.bucket.tail:
                self._unlink_bucket(node.bucket)
            del self.nodes[key]
            return
        self._move(node, node.bucket.count - 1, up=False)

    def getMaxKey(self) -> str:  # noqa: N802 — LeetCode API
        bucket = self.last.prev
        return "" if bucket is self.first else bucket.head.next.key

    def getMinKey(self) -> str:  # noqa: N802 — LeetCode API
        bucket = self.first.next
        return "" if bucket is self.last else bucket.head.next.key
