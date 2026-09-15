class Solution:
    def depthSumInverse(self, nestedList):
        level = list(nestedList.getList())
        total = 0
        flat = 0
        while level:
            next_level = []
            level_sum = 0
            for node in level:
                if node.isInteger():
                    level_sum += node.getInteger()
                else:
                    next_level.extend(node.getList())
            flat += level_sum
            total += flat
            level = next_level
        return total
