from collections import deque


class FrontMiddleBackQueue:
    """Two deques split at the middle: front holds the first ceil(n/2)
    elements, back the rest, so the middle always sits at an end of each
    deque — _balance restores the split after every mutating call.
    """

    def __init__(self):
        self.front = deque()
        self.back = deque()

    def _balance(self):
        if len(self.front) > len(self.back) + 1:
            self.back.appendleft(self.front.pop())
        elif len(self.front) < len(self.back):
            self.front.append(self.back.popleft())

    def pushFront(self, val: int):
        self.front.appendleft(val)
        self._balance()

    def pushMiddle(self, val: int):
        # The new element must land one slot before the current back of
        # front (the frontmost middle of the result), so when front is the
        # bigger half, its last element moves to back first — front.append
        # then writes exactly the middle slot.
        if len(self.front) > len(self.back):
            self.back.appendleft(self.front.pop())
        self.front.append(val)

    def pushBack(self, val: int):
        self.back.append(val)
        self._balance()

    def popFront(self) -> int:
        if not self.front:
            return -1
        val = self.front.popleft()
        self._balance()
        return val

    def popMiddle(self) -> int:
        # ceil(n/2) elements in front means the frontmost middle — the
        # back of front — at every length, odd or even.
        if not self.front:
            return -1
        val = self.front.pop()
        self._balance()
        return val

    def popBack(self) -> int:
        if self.back:
            val = self.back.pop()
        elif self.front:
            val = self.front.pop()
        else:
            return -1
        self._balance()
        return val
