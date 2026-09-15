# Solutions — Number of Pairs After Increment

Keep raw values, a lazy addition, and a frequency map per block. Full range-update blocks change only their lazy value; boundary blocks are materialized and rebuilt. A sum query checks each distinct nums1 value against every block after removing its lazy offset.

## Square-root decomposition

Keep raw values, a lazy addition, and a frequency map per block. Full range-update blocks change only their lazy value; boundary blocks are materialized and rebuilt. A sum query checks each distinct nums1 value against every block after removing its lazy offset.

**Complexity:** `O((n+q)√n) time, O(n) space`.
