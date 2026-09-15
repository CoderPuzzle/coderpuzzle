class Solution {

    public int minimumOneBitOperations(int n) {
        // The two operations exactly step through the reflected binary Gray
        // code sequence, so the answer is n's position in that ordering:
        // the binary count that Gray-encodes into n. Recovering it is the
        // standard inverse Gray-code transform, a cascading XOR downshift.
        int ans = 0;
        while (n != 0) {
            ans ^= n;
            n >>>= 1;
        }
        return ans;
    }
}
