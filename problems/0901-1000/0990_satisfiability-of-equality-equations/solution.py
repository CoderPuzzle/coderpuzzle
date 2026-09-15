from typing import List, Optional


class Solution:
    def equationsPossible(self, equations: List[str]) -> bool:
        # Each letter starts as its own class; parent[x] names its root.
        parent = list(range(26))

        def find(letter: int) -> int:
            # Iterative find with path compression: chase to the root,
            # then point every visited letter straight at it.
            root = letter
            while parent[root] != root:
                root = parent[root]
            while parent[letter] != root:
                parent[letter], letter = root, parent[letter]
            return root

        # Pass one fuses every equality, so each class is the full set of
        # letters some chain of '==' has tied together.
        for equation in equations:
            if equation[1] == "=":
                left = find(ord(equation[0]) - ord("a"))
                parent[left] = find(ord(equation[3]) - ord("a"))
        # Pass two judges the disequalities: an inequality whose sides sit
        # in one class is unsatisfiable, since both must take one value.
        for equation in equations:
            if equation[1] == "!":
                if find(ord(equation[0]) - ord("a")) == find(ord(equation[3]) - ord("a")):
                    return False
        return True
