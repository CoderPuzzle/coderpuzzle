# Solutions — Number of Students Unable to Eat Lunch

The queue is more motion than mechanism: a student who does not want the top
sandwich cycles to the back and the queue returns to exactly the state it was
in, so rotations decide nothing — only how many students of each preference
remain does. That observation dissolves the simulation into two preference
counts and one downward scan of the stack.

## Count the two preferences, spend them down the stack

Count how many queued students prefer each sandwich type, into `count[0]` and
`count[1]`. Then read the sandwiches from the top of the stack downward. A
sandwich is taken exactly when at least one remaining student prefers its
type — whichever student that is, rotation eventually delivers them to the
front — so decrement `count[sandwich]` and continue. The first sandwich whose
type's count has already reached zero can never be taken: nobody in the queue
wants it, and since the cafeteria serves strictly top-down, no sandwich below
it is reachable either. Stop there; the students still unaccounted for,
`count[0] + count[1]`, are exactly those unable to eat.

Order inside the queue never enters the computation, and neither does any
explicit rotation. The stall this detects is the same one the simulation
would reach: it can only occur when the top of the stack turns to a type
whose takers are exhausted, because until that moment every full pass through
the queue feeds the top sandwich to somebody. Both arrays are read once, the
only state is the pair of counts, and the answer is at most `100`,
comfortably inside a 32-bit integer.

**Complexity:** `O(n)` time, `O(1)` extra space.
