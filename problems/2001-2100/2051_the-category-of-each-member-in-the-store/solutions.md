# Solutions — The Category of Each Member in the Store

## Count visits and purchases per member

Start from `Members` and left join both `Visits` and `Purchases`, which preserves members who have never visited. Grouping by member gives the number of visits and the number whose `visit_id` appears in `Purchases`; `charged_amount` is deliberately ignored because only whether a purchase occurred affects conversion.

A zero visit count maps directly to Bronze. Otherwise, compare `purchase_count * 100` with `visit_count * 80` and `visit_count * 50`, testing Diamond before Gold and leaving Silver as the remainder. These integer cross-products make the exact 80% and 50% boundaries unambiguous without division or rounding.

**Complexity:** `O(M + V + P)` time and `O(M + V + P)` engine space for join indexes and grouping, where `M`, `V`, and `P` are the table sizes.
