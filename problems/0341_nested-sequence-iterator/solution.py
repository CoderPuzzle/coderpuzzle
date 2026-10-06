# This is the interface that allows for creating nested lists.
# You should not implement it, or speculate about its implementation
# class NestedInteger:
#     def isInteger(self) -> bool:
#         ...
#     def getInteger(self) -> int:
#         ...
#     def setInteger(self, value: int) -> None:
#         ...
#     def add(self, item: NestedInteger) -> None:
#         ...
#     def getList(self) -> list[NestedInteger]:
#         ...


class NestedSequenceIterator:
    def __init__(self, nestedList):
        self.values = []

        def walk(node):
            if node.isInteger():
                self.values.append(node.getInteger())
            else:
                for child in node.getList():
                    walk(child)

        for item in nestedList.getList():
            walk(item)
        self.cursor = 0

    def nextValue(self):
        value = self.values[self.cursor]
        self.cursor += 1
        return value

    def hasMore(self):
        return self.cursor < len(self.values)
