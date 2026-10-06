class NestedInteger:
    """LeetCode's nested-list API: an integer hold or a list of
    NestedInteger (never both)."""

    def __init__(self, value=None):
        self._integer = None
        self._list = []
        if isinstance(value, int) and not isinstance(value, bool):
            self.setInteger(value)

    def isInteger(self):
        return self._integer is not None

    def getInteger(self):
        return self._integer

    def setInteger(self, value):
        self._integer = value
        self._list = []

    def add(self, item):
        self._integer = None
        self._list.append(item)

    def getList(self):
        return self._list
