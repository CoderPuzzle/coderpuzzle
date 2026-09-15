# Solutions — Maximum Number of Vowels in a Substring of Given Length

## Fixed-Size Sliding Window

Only windows of exactly length k matter, and the vowel counts of consecutive windows differ by at most two characters: the letter entering on the right and the letter leaving on the left. So after counting the vowels of the first k characters once, every subsequent window's count follows from the previous one in constant time.

The solution initializes both the running count and the best answer from the prefix of length k, then slides the right edge from k to the end of the string. At each step it adds one if the incoming character is a vowel, subtracts one if the outgoing character k positions behind is a vowel, and raises the best count whenever the running value improves.

Because the constraints guarantee k never exceeds the length of the string, the initial window is always non-empty and there is no degenerate case to handle; when k equals the whole length the loop body never runs and the answer is simply the total vowel count from the initialization. The vowel test is a membership check against a five-element set, so each slide does constant work.

**Complexity:** `O(n)` time, `O(1)` space.
