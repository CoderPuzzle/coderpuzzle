class Solution:
    def buildAndEvaluate(self, s: str) -> int:
        self.s = s
        self.pos = 0
        return self._parse_expr()

    def _parse_expr(self) -> int:
        value = self._parse_term()
        while self.pos < len(self.s) and self.s[self.pos] in "+-":
            op = self.s[self.pos]
            self.pos += 1
            rhs = self._parse_term()
            value = value + rhs if op == "+" else value - rhs
        return value

    def _parse_term(self) -> int:
        value = self._parse_factor()
        while self.pos < len(self.s) and self.s[self.pos] in "*/":
            op = self.s[self.pos]
            self.pos += 1
            rhs = self._parse_factor()
            if op == "*":
                value = value * rhs
            else:
                quotient = abs(value) // abs(rhs)
                value = -quotient if (value < 0) != (rhs < 0) else quotient
        return value

    def _parse_factor(self) -> int:
        if self.s[self.pos] == "(":
            self.pos += 1
            value = self._parse_expr()
            self.pos += 1  # skip ')'
            return value
        value = int(self.s[self.pos])
        self.pos += 1
        return value
