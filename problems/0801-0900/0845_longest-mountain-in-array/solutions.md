# Solutions — Longest Mountain in Array

## Peak scan with slope expansion

Every mountain is pinned together by its peak — the one interior index that
strictly beats both neighbors — so instead of examining windows, scan the
array for peaks and measure the mountain each peak anchors. From a peak at
`i`, walk left while the values keep rising strictly toward it and right
while they keep falling strictly away from it; the stretch between the two
stopping points is a mountain, and no mountain is wider than the one
measured at its own peak, because every other index of it fails the peak
test. After measuring, jump the cursor past the right foot: every index in
between sits on a descent, and a descent cannot rise again without breaking
strictness, so no peak can hide there.

Strictness does all the discriminating. Plateaus never pass a comparison —
equal neighbors on a slope stop the walk, and equal values beside a would-be
top disqualify it entirely, which is why `[1,5,5,2]` holds no peak at all
and answers 0 exactly like the monotone arrays. The peak test also demands
an interior index, so a strictly increasing or decreasing array measures
nothing, and arrays shorter than 3 never enter the loop, leaving the answer
at its initial 0. Because each measurement jumps past the descent it
measured, no index is ever walked over twice and nothing is stored beyond
a few indices — one pass, constant space, which settles both follow-up
questions at once.

Example 1 has a single peak, the 7 with `4 < 7 > 3` around it: the left
walk collects `1,4`, the right walk `3,2`, and `[1,4,7,3,2]` answers 5,
while the trailing 5 climbs again but never crests, so it extends nothing.
The `2,2,2` of Example 2 never produces a strict comparison, hence no peak
and 0. Elements are only compared, never combined, so the `0` to `10⁴`
value range never needs arithmetic wider than the elements themselves.

**Complexity:** `O(n)` time, `O(1)` space.
