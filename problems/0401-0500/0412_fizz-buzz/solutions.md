# Solutions — Fizz Buzz

## String building from each divisor

The four rules are not four branches. Each entry starts empty, and each
divisor that applies appends its own word — divisible by 3 appends
`"Fizz"`, divisible by 5 appends `"Buzz"` — so the combined case
`"FizzBuzz"` simply emerges when both checks fire, and the two single-word
cases when exactly one does. An entry that stayed empty matched neither
divisor and takes the number's own decimal spelling; that is the whole
algorithm, one pass over `1..n` with at most two tests per position.

The order of the two appends is forced by the target spelling
(`"FizzBuzz"`, never `"BuzzFizz"`), but nothing else about the checks
matters: they are independent, so either could come first in the code with
identical output. Both divisors share no state beyond the entry being
built, and every `i` from 1 to `n` is visited exactly once in order, which
is what makes the array 1-indexed by construction — `answer[i]` is decided
when the loop counter equals `i`.

Nothing beyond the answer itself is stored: the running entry is rebuilt
from scratch each iteration and holds at most eight characters, so the
pass is a straight `O(n)` walk whose only allocation of size is the
returned array.

**Complexity:** `O(n)` time, `O(1)` space beyond the returned list.
