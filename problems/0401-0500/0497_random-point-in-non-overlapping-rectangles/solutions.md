# Solutions — Random Point in Non-overlapping Rectangles

## Area-Weighted Rectangle, Uniform Cell

Uniformity over all covered integer points factors into two uniforms. Choose rectangle `i` with probability proportional to its number of integer cells — `(xi - ai + 1) * (yi - bi + 1)`, not the product of side lengths as raw differences — then choose a cell inside it uniformly; multiplying, each point of rectangle `i` gets `area(i)/total · 1/area(i) = 1/total`. Conversely, any sampler uniform over points must visit rectangles in proportion to their areas, so a big rectangle next to a small one absorbs correspondingly more draws — exactly what the statistical judge measures (each judged `pick` runs tens of thousands of draws; every returned point must belong to some rectangle and each point's frequency must match `1/total` within a tolerance band).

The weighted choice is prefix sums plus binary search: `P[i+1] = P[i] + area(i)` turns a uniform `cell ∈ [0, total)` into a rectangle index — the unique `i` with `P[i] <= cell < P[i+1]`, found by `bisect_left` in Python and a hand-rolled binary search in Java (accumulating into `long`, since 100 rectangles of 2000×2000 cells overflow 32-bit sums). Decoding inside the rectangle is row-major indexing with width `w = xi - ai + 1`: point `(ai + offset % w, bi + offset / w)`. The decode is a bijection, which is what makes the inner draw uniform over cells rather than merely plausible.

**Judged scale.** The judge's frequency table is keyed by whole returned points, so the statistical cases are restricted to configurations whose covered area is at most ~100 integer points — enough for multi-rectangle mixes, tall-and-thin against wide-and-flat shapes, adjacent rectangles, and extreme coordinates, but far below the constraint ceiling (`10⁹` coordinates, 2000×2000 sides), where no enumerable table exists. The construction's uniformity proof is independent of scale.

**Complexity:** `O(n)` construction, `O(log n)` per `pick`, `O(n)` space.
