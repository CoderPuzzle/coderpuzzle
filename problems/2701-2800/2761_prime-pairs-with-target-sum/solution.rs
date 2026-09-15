impl Solution {
    pub fn find_prime_pairs(n: i32) -> Vec<Vec<i32>> {
        // Sieve of Eratosthenes up to n: assume every integer >= 2 is prime,
        // then cross off each prime's multiples. Any composite has a factor
        // <= its square root, so i * i is where the crossing-off starts.
        let size = (n + 1) as usize;
        let mut is_prime = vec![true; size];
        is_prime[0] = false;
        is_prime[1] = false;
        let mut i = 2usize;
        while i * i <= n as usize {
            if is_prime[i] {
                let mut multiple = i * i;
                while multiple <= n as usize {
                    is_prime[multiple] = false;
                    multiple += i;
                }
            }
            i += 1;
        }
        // Scan the smaller endpoint only: x <= n / 2 forces y = n - x >= x,
        // so every pair appears once, and ascending x gives the required
        // order for free. The smallest prime pair sums to 2 + 2 = 4, so any
        // n below that leaves the list empty.
        let mut pairs: Vec<Vec<i32>> = Vec::new();
        for x in 2..=(n / 2) as usize {
            if is_prime[x] && is_prime[n as usize - x] {
                pairs.push(vec![x as i32, n - x as i32]);
            }
        }
        pairs
    }
}
