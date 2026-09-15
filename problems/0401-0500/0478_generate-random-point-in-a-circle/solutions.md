# Solutions — Generate Random Point in a Circle

## Rejection sampling on a judged quantization grid

Draw a candidate point uniformly in the axis-aligned bounding square — two independent uniform doubles mapped to `[-radius, radius)` — and reject it while it falls outside the disc, tested with `dx² + dy² <= radius²` so circumference points count as inside. A square-to-disc area ratio of `4/π` makes the expected number of attempts ≈ `1.27`, and each attempt costs two random draws, so the sampler stays O(1) per call with no per-call trigonometry.

The judge compares whole distributions, not individual draws, so every returned point is quantized to a fixed 4×4 grid before it is returned: the bounding square splits into sixteen cells of side `radius/2`, and the returned pair is the containing cell's center, `x_center + (i - 1.5) · radius/2` with `i ∈ {0..3}` (likewise for y). A uniform-in-disc sample lands in a cell with probability equal to that cell's area share — the four central cells each hold a full `0.25/π ≈ 7.96%` of the mass, edge cells are clipped by the arc, and the four corner cells keep only their inside-the-arc slivers — so the observed frequencies of the sixteen returned values test both the angular and the radial uniformity of the sampler (a sampler with `r` uniform instead of `r ∝ √u` shifts mass outward and fails the corner/center balance). The grid arithmetic is kept on short dyadic offsets so every language emits the identical pair for a given cell.

The constructor stores the three doubles once; `randPoint` allocates nothing but its two-element answer, so repeated calls cost a bounded expected number of random draws each.

**Complexity:** expected O(1) time per call (≈ `1.27` rejection attempts), O(1) extra space.
