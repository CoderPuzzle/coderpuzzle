class Solution:
    def minOperations(self, s1: str, s2: str) -> int:
        selected_edges = 0
        covered_by_previous = False

        for i, (source, target) in enumerate(zip(s1, s2)):
            needs_pair = source == "1" and target == "0"
            if needs_pair and not covered_by_previous:
                if len(s1) == 1:
                    return -1
                selected_edges += 1
                covered_by_previous = i + 1 < len(s1)
            else:
                covered_by_previous = False

        return s2.count("1") - s1.count("1") + 3 * selected_edges
