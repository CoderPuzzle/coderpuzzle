class SmallestInfiniteSet:
    def __init__(self) -> None:
        # Everything below `next_new` has been popped at least once; a
        # removed value is present again exactly when it sits in this
        # set. Values >= next_new have never been touched.
        self.next_new = 1
        self.added_back: set[int] = set()

    def popSmallest(self) -> int:
        if self.added_back:
            value = min(self.added_back)
            self.added_back.remove(value)
            return value
        value = self.next_new
        self.next_new += 1
        return value

    def addBack(self, num: int) -> None:
        # Only values already popped can be added back.
        if num < self.next_new:
            self.added_back.add(num)
