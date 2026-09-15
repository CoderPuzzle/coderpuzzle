# Solutions — Basic Calculator IV

The grammar has exactly three levels — brackets, then multiplication,
then addition and subtraction — and every level is an operation on
polynomials, so the evaluation is a single scan that carries one map per
subexpression: term (its free variables, sorted, joined by `*`; the empty
term is the constant) to coefficient, with substituted variables entering
as constants. Two stacks — polynomials and pending operators — apply the
precedence without any recursion, and the final map prints itself in the
statement's canonical order: degree descending, lexicographic within a
degree, zero terms dropped.

## Two stacks of polynomials

Scan the expression once. Parentheses and operators are single characters
and every other token is one run of letters or digits, so tokenizing is a
character scan that skips spaces. Each operand becomes a one-term
polynomial: a number, or a variable the evaluation map replaces, lands in
the constant term, and a free variable becomes a single term of
coefficient 1. The operator stack then encodes the precedence in four
rules: `'('` pushes; `'+'` or `'-'` first drains every pending operator
down to the nearest `'('`, the loosest-binding operators waiting for
their left side; `'*'` drains only pending `'*'`s; `')'` drains to its
matching `'('` and drops it. Draining pops two polynomials and pushes
their combination; when the scan ends, the leftover operators drain the
same way.

Combining is plain polynomial arithmetic on the term maps. Addition and
subtraction merge coefficients of equal terms; multiplication pairs every
term of the left polynomial with every term of the right, concatenates
the two sorted variable lists into one sorted list, and adds the
coefficient product under the merged term — so `b*a` and `a*b` land on
the same key and simply add. Coefficients ride in 64-bit integers: the
statement bounds every intermediate result by 32 bits, but a term product
forms its coefficient product before any cancellation, and compounding
through nested multiplications is exactly where a 32-bit accumulator
would pinch.

The answer is the final map with its zero terms discarded, sorted with an
explicit comparator — degree (the term's variable count) descending
first, then the term string ascending. Comparing the joined strings is
exactly comparing the variable lists lexicographically, because `'*'`
sorts below every lowercase letter; the empty term sorts last by degree
and prints as its bare coefficient, every other term as coefficient,
`'*'`, then its variables, a leading 1 included. An expression that
cancels to zero prints nothing at all.

**Complexity:** `O(n · t² · d log d)` time, `O(n · t · d)` space — n
tokens, t distinct terms in the largest intermediate polynomial, and d
variables in its longest term (each multiplication pays t₁ · t₂ term
products, each a sort of at most 2d variables).
