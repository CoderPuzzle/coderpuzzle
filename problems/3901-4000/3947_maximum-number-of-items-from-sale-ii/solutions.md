# Solutions — Maximum Number of Items From Sale II

Type i has gain[i] boosted copies worth two items each, followed by ordinary copies worth one. Sort type batches by price, take affordable boosted copies while their price is at most twice the cheapest ordinary price, and fill remaining budget with cheapest ordinary copies; evaluate each batch endpoint.

## Sorted boosted marginals

Type i has gain[i] boosted copies worth two items each, followed by ordinary copies worth one. Sort type batches by price, take affordable boosted copies while their price is at most twice the cheapest ordinary price, and fill remaining budget with cheapest ordinary copies; evaluate each batch endpoint.

**Complexity:** `O(n log n + F log F) time, O(n+F) space`.
