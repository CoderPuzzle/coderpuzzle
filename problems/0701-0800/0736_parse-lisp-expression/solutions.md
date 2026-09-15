# Solutions — Parse Lisp Expression

## Recursive Descent with Scoped Environments

The evaluator works on a token list produced by padding every parenthesis with spaces and splitting, so the tokens are exactly the atoms and the parens. `parse(i, env)` consumes one expression starting at token `i` and returns its value together with the index just past it, letting a caller continue reading sibling expressions. A bare token is either an integer (its first character is not a lowercase letter) or a variable looked up in `env`, the environment threaded through the call chain so inner scopes see outer bindings.

An `add` or `mult` form evaluates its two sub-expressions recursively, combines their values, and skips the closing parenthesis on the way out. A `let` form first copies the current environment into a fresh dictionary — that single copy implements lexical scoping, since assignments and shadowing performed here must not leak back to the caller. It then walks variable/expression pairs sequentially, each expression evaluated in a scope that already contains the earlier assignments (so `(let x 3 x 2 x)` ends with `x` bound to 2), and finally evaluates the trailing body expression in the same scope and returns its value.

The one ambiguity inside a `let` is telling the final body expression from the next variable name; the resolver checks whether the token is an open parenthesis, an integer, or a lone variable with nothing between it and the closing parenthesis — the last case detected by peeking at the next token. Working over token indices rather than recursive substrings keeps each token examined a constant number of times, so parsing itself is linear in the token count; the quadratic worst case comes entirely from each `let` copying its whole environment, and the same live copies bound the memory (typical inputs with small or shallow scopes are near-linear).

**Complexity:** `O(L^2)` time, `O(L^2)` space.
