class Solution {

    public boolean checkPerfectNumber(int num) {
        // Proper divisors pair around the square root: whenever i divides num,
        // so does num / i, and one of the pair never exceeds sqrt(num). Seed
        // the total with 1 — the partner of the excluded num itself — then add
        // both members on each clean division below the root. num stays under
        // 1e8, so i tops out at 1e4 and i * i fits an int, while the total
        // rides in a long with room to spare.
        if (num <= 1) {
            return false;
        }
        long total = 1;
        for (int i = 2; i * i <= num; ++i) {
            if (num % i == 0) {
                total += i;
                // A candidate sitting exactly on the root is its own partner.
                if (i != num / i) {
                    total += num / i;
                }
            }
        }
        return total == num;
    }
}
