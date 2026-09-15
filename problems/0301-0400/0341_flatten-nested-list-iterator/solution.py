class NestedIterator:
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

    def next(self):
        value = self.values[self.cursor]
        self.cursor += 1
        return value

    def hasNext(self):
        return self.cursor < len(self.values)
