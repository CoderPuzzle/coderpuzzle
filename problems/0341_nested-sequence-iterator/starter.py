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
    def __init__(self, nestedList: NestedInteger):
        raise NotImplementedError("TODO")

    def nextValue(self) -> int:
        raise NotImplementedError("TODO")

    def hasMore(self) -> bool:
        raise NotImplementedError("TODO")
