# Solutions — Best Position for a Service Centre

## Weiszfeld's iterative algorithm

The point that minimizes the sum of Euclidean distances to a set of points
is the geometric median, and it has no closed-form formula in general.
Weiszfeld's algorithm finds it by iteratively re-weighting: starting from a
guess (the centroid of all customers works well), each step moves the
guess to the weighted average of every customer's position, where each
customer's weight is the reciprocal of its current distance from the
guess. Customers that are currently far away pull the guess less strongly
per unit distance than customers that are close, and the fixed point of
this update is exactly the geometric median.

The update is repeated for a fixed, generous number of iterations (a few
hundred is ample for the small inputs here), which is enough for the guess
to converge far below the required tolerance regardless of how the
customers are arranged. A tiny constant is added to every distance before
taking its reciprocal so that a guess landing exactly on a customer's
position never divides by zero; because the constant is astronomically
smaller than any distance the algorithm needs to resolve, it has no
measurable effect on the final answer. Once the loop finishes, the answer
is the sum of the true (unperturbed) distances from the converged point to
every customer, which is what gets returned.

**Complexity:** `O(n * iterations)` time, `O(1)` extra space.
