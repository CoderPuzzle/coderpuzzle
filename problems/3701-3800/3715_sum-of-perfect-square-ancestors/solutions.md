# Solutions — Sum of Perfect Square Ancestors

## Square-Free Kernels with Tree Aggregation

Multiplying two integers yields a perfect square precisely when they share
the same square-free kernel: strip every prime's even powers and whatever
remains must coincide. Let `M = max(nums)`. A smallest-prime-factor sieve up
to `M` makes extracting each kernel cheap — walk the value down through its
smallest prime, tracking which primes divide it an odd number of times. The
task then reduces to a counting question: for every node, how many of its
ancestors carry an equal kernel.

One depth-first pass answers all nodes at once. Carry a frequency table
indexed by kernel value; entering a node first adds its kernel's current
count to the answer and only then increments it, since every node still on
the walk is an ancestor of whatever is visited next. Leaving a subtree has
to undo those increments, so each enter pushes an exit marker beneath its
children on an explicit stack. The bookkeeping tracks exactly the current
root-to-node path — never across it, which rules out the tempting shortcut
of counting matches against all earlier-processed nodes: in a star, two
same-kernel siblings sit adjacent in processing order but are not ancestors
of one another.

The walk must be iterative: a chain keeps every node on the path at once,
and `10⁵` nested calls overflow default stacks (CPython caps near 1000
frames). The accumulator needs width too — a fully matching chain sums to
`n(n − 1)/2`, about `5 × 10⁹` at the constraint ceiling, past the 32-bit
range yet comfortably under JavaScript's `2⁵³` safe-integer bound. Sieving
dominates the rest, so the run is linear in the input size.

**Complexity:** `O(n + M)` time, `O(n + M)` space.
