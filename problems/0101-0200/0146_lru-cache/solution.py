from typing import Dict, Optional


class _Node:
    __slots__ = ("key", "value", "prev", "next")

    def __init__(self, key: int = -1, value: int = -1) -> None:
        self.key = key
        self.value = value
        self.prev: Optional[_Node] = None
        self.next: Optional[_Node] = None


class LRUCache:
    """Hash map from key -> list node over a doubly linked recency list.

    The head side is most recently used; the tail side is least recently
    used. Sentinel head/tail nodes remove every boundary case.
    """

    def __init__(self, capacity: int) -> None:
        self.capacity = capacity
        self.nodes: Dict[int, _Node] = {}
        self.head = _Node()  # sentinel before the most recent entry
        self.tail = _Node()  # sentinel after the least recent entry
        self.head.next = self.tail
        self.tail.prev = self.head

    def _unlink(self, node: _Node) -> None:
        node.prev.next = node.next
        node.next.prev = node.prev

    def _push_front(self, node: _Node) -> None:
        first = self.head.next
        node.prev = self.head
        node.next = first
        self.head.next = node
        first.prev = node

    def get(self, key: int) -> int:
        node = self.nodes.get(key)
        if node is None:
            return -1
        self._unlink(node)
        self._push_front(node)
        return node.value

    def put(self, key: int, value: int) -> None:
        node = self.nodes.get(key)
        if node is not None:
            node.value = value
            self._unlink(node)
            self._push_front(node)
            return
        if len(self.nodes) == self.capacity:
            lru = self.tail.prev
            self._unlink(lru)
            del self.nodes[lru.key]
        node = _Node(key, value)
        self.nodes[key] = node
        self._push_front(node)
