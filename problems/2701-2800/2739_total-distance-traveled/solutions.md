# Solutions — Total Distance Traveled

## Burn the main tank in blocks of five

The truck gets 10 km out of every liter it burns, and each full five
liters burned triggers one immediate liter of injection from the
additional tank whenever that tank is not empty — so the whole trip can
be driven by watching only the main tank's level. While the level is at
least five, burn a block of five liters for 50 km and then pull over one
liter from the additional tank if one remains; the level nets down by
four when an injection happens and by five otherwise.

Every round either drains the additional tank by one liter or leaves it
untouched, and the main level strictly decreases, so the loop terminates
after a handful of rounds for the given bounds (`mainTank,
additionalTank <= 100`). Once the level drops below five liters it can
never reach another multiple-of-five consumption point, which is why a
large additional tank still cannot keep injecting forever — whatever
remains is simply burned off directly at 10 km per liter.

**Complexity:** `O(mainTank)` time, `O(1)` space.
