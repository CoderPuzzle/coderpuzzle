from typing import List, Optional


class Solution:
    def evaluate(self, expression: str) -> int:
        tokens = expression.replace("(", " ( ").replace(")", " ) ").split()

        def is_variable(token):
            return token[0].islower()

        def parse(i, env):
            token = tokens[i]
            if token != "(":
                if is_variable(token):
                    return env[token], i + 1
                return int(token), i + 1
            op = tokens[i + 1]
            i += 2
            if op in ("add", "mult"):
                a, i = parse(i, env)
                b, i = parse(i, env)
                return (a + b) if op == "add" else (a * b), i + 1
            # let
            local = dict(env)
            value = None
            while tokens[i] != ")":
                if token_is_expression_start(i):
                    value, i = parse(i, local)
                else:
                    var = tokens[i]
                    value, i = parse(i + 1, local)
                    local[var] = value
            return value, i + 1

        def token_is_expression_start(i):
            token = tokens[i]
            if token == "(" or not is_variable(token):
                return True
            # A variable is the final expression iff nothing follows it before ")".
            return tokens[i + 1] == ")"

        result, _ = parse(0, {})
        return result
