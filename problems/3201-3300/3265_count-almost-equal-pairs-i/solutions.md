# Solutions — Count Almost Equal Pairs I

## One-Swap Families

Two values are almost equal exactly when one single digit exchange,
performed inside one chosen number, turns it into the other; performing
no operation at all is allowed, so equal values always qualify. Give
every element a family: the set of values obtainable by exchanging two
digit positions of its decimal form, the number itself included. Because
the operation may touch only one of the two numbers, a pair qualifies
precisely when either element belongs to the other's family — testing
both directions matters, and the families' own entries cover the
already-equal pairs with no special case.

An exchange may carry the leading nonzero digit inward and leave zeros
in front — swapping the digits of 30 produces "03", whose value is 3 —
so each swapped digit string is parsed back into an integer instead of
being compared as text. That collapse is what lets numbers of different
lengths meet, and no extra padding is needed: a swap only rearranges
digits, so a family member's value never has more digits than the
original. With at most seven digits per value, each family holds at
most 1 + C(7,2) = 22 members, so building `n` families and checking
every pair by membership is far below a million steps for `n <= 100`.

**Complexity:** `O(n² · d²)` time, `O(n · d²)` space, where `d <= 7` is
the digit count of the largest value.
