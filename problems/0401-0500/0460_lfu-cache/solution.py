from typing import Dict, Optional


class _Node:
    __slots__ = ("key", "value", "freq", "bucket", "prev", "next")

    def __init__(self, key: int = -1, value: int = -1) -> None:
        self.key = key
        self.value = value
        self.freq = 1
        self.bucket: Optional["_Bucket"] = None
        self.prev: Optional["_Node"] = None
        self.next: Optional["_Node"] = None


class _Bucket:
    """One frequency: an LRU list of nodes (head side = least recent) plus
    links to the neighbouring frequencies."""

    __slots__ = ("freq", "head", "tail", "prev", "next")

    def __init__(self, freq: int) -> None:
        self.freq = freq
        self.head = _Node()  # sentinel before the least recent node
        self.tail = _Node()  # sentinel after the most recent node
        self.head.next = self.tail
        self.tail.prev = self.head
        self.prev: Optional["_Bucket"] = None
        self.next: Optional["_Bucket"] = None


class LFUCache:
    """Frequency buckets in a doubly linked list, each bucket an LRU list.

    The first real bucket is always the minimum frequency, so eviction reads
    its head-side node; a use moves the node to the bucket one frequency up,
    creating that bucket exactly where it belongs if it is missing.
    """

    def __init__(self, capacity: int) -> None:
        self.capacity = capacity
        self.nodes: Dict[int, _Node] = {}
        self.first = _Bucket(0)  # sentinel before the lowest frequency
        self.last = _Bucket(0)  # sentinel after the highest frequency
        self.first.next = self.last
        self.last.prev = self.first

    def _unlink_node(self, node: _Node) -> None:
        node.prev.next = node.next
        node.next.prev = node.prev

    def _push_node(self, bucket: _Bucket, node: _Node) -> None:
        last = bucket.tail.prev
        node.prev = last
        node.next = bucket.tail
        last.next = node
        bucket.tail.prev = node

    def _unlink_bucket(self, bucket: _Bucket) -> None:
        bucket.prev.next = bucket.next
        bucket.next.prev = bucket.prev

    def _add_bucket_after(self, anchor: _Bucket, bucket: _Bucket) -> None:
        following = anchor.next
        bucket.prev = anchor
        bucket.next = following
        anchor.next = bucket
        following.prev = bucket

    def _bump(self, node: _Node) -> None:
        old = node.bucket
        following = old.next
        self._unlink_node(node)
        if following.freq == node.freq + 1:
            target = following
        else:
            target = _Bucket(node.freq + 1)
            self._add_bucket_after(old, target)
        node.freq += 1
        node.bucket = target
        self._push_node(target, node)
        if old.head.next is old.tail:
            self._unlink_bucket(old)

    def get(self, key: int) -> int:
        node = self.nodes.get(key)
        if node is None:
            return -1
        self._bump(node)
        return node.value

    def put(self, key: int, value: int) -> None:
        node = self.nodes.get(key)
        if node is not None:
            node.value = value
            self._bump(node)
            return
        if len(self.nodes) == self.capacity:
            victim_bucket = self.first.next
            victim = victim_bucket.head.next
            self._unlink_node(victim)
            del self.nodes[victim.key]
            if victim_bucket.head.next is victim_bucket.tail:
                self._unlink_bucket(victim_bucket)
        node = _Node(key, value)
        self.nodes[key] = node
        first = self.first.next
        if first.freq == 1:
            target = first
        else:
            target = _Bucket(1)
            self._add_bucket_after(self.first, target)
        node.bucket = target
        self._push_node(target, node)
