class Solution:
    def countOfAtoms(self, formula: str) -> str:
        # Scan the formula once with an explicit stack of count maps. '('
        # opens a fresh map; an element name — one uppercase letter plus any
        # lowercase run — lands its count (implicit 1) in the top map; ')'
        # pops the top map, reads the optional trailing multiplier, and
        # folds every atom into the parent scaled by it. The bottom map left
        # at the end holds the totals, written in sorted name order with
        # counts of 1 omitted.
        stack = [{}]
        i, n = 0, len(formula)
        while i < n:
            if formula[i] == "(":
                stack.append({})
                i += 1
            elif formula[i] == ")":
                j = i + 1
                while j < n and formula[j].isdigit():
                    j += 1
                mult = int(formula[i + 1 : j] or "1")
                group = stack.pop()
                top = stack[-1]
                for name, cnt in group.items():
                    top[name] = top.get(name, 0) + cnt * mult
                i = j
            else:
                j = i + 1
                while j < n and formula[j].islower():
                    j += 1
                name = formula[i:j]
                k = j
                while k < n and formula[k].isdigit():
                    k += 1
                cnt = int(formula[j:k] or "1")
                top = stack[-1]
                top[name] = top.get(name, 0) + cnt
                i = k
        counts = stack[0]
        return "".join(name + (str(counts[name]) if counts[name] > 1 else "") for name in sorted(counts))
