# Solutions — Check if Numbers Are Ascending in a Sentence

## Track the previous number

Split the sentence into its space-separated tokens and inspect each token's first character. A digit at the first position identifies a numeric token under the sentence rules, so parse that token and compare it with the previous number seen.

If the current number is less than or equal to the previous one, the sequence is not strictly increasing and the method returns `false` immediately. Otherwise, update the previous number and continue; reaching the end means every consecutive pair of numbers was in ascending order.

**Complexity:** `O(|s|)` time and `O(|s|)` space for the tokenization.
