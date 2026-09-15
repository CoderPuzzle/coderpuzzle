# Solutions — Count Subarrays With Score Less Than K

## Sliding window over each right endpoint

Scores grow whenever a window grows. Appending an element x to a window whose sum is s and length is l changes the score by s + x·l + x, which is positive because every element is at least 1 (so s ≥ l); dropping the leftmost element changes it by the negative of that identity. So for a fixed right endpoint the qualifying left boundaries form a suffix of the positions ending there, and appending one more element on the right raises every existing window's score, so that suffix only shrinks as the right endpoint advances — exactly the monotone behavior a two-pointer sweep needs.

The code keeps the running sum of `nums[left..right]`. After each append it shrinks from the left while the window's score is ≥ k. When the loop stops, `[left..right]` is the longest qualifying subarray ending at `right`, and every shorter suffix qualifies too (shortening only lowers the score), so adding `right - left + 1` counts precisely the qualifying subarrays that end at `right`. If even the single element fails, the loop empties the window — its score is 0, which is < k since k ≥ 1 — and nothing is added. Each position enters and leaves the window at most once, so despite the nested loop the total work is linear.

Widening: the largest sum any window can hold is n · max(nums[i]) = 10⁵ × 10⁵ = 10¹⁰, which already overflows 32 bits, so C++, Go, Java, and Rust accumulate it in a 64-bit type (`long long`, `int64`, `long`, `i64`). The product itself cannot overflow anywhere: no score exceeds 10¹⁰ × 10⁵ = 10¹⁵, about 9,000 times below the signed 64-bit ceiling of ≈ 9.22 × 10¹⁸, and k ≤ 10¹⁵ fits too; Python integers are unbounded, and JavaScript numbers hold every integer through 2⁵³ ≈ 9.0 × 10¹⁵ exactly, so all scores here are exact.

**Complexity:** `O(n)` time and `O(1)` space.
