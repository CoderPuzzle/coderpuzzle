function monkeyMove(n: number): number {
    // Complement counting: only the two unanimous rotations avoid all
    // collisions, so the answer is (2^n - 2) mod 1e9+7 by iterative
    // binary exponentiation. TS numbers stay exact because the peasant
    // mul-mod below never lets any value reach 2^31, far under 2^53.
    const mod = 1000000007;
    const addMod = (a: number, b: number): number => {
        const sum = a + b;
        return sum >= mod ? sum - mod : sum;
    };
    const mulMod = (a: number, b: number): number => {
        let result = 0;
        while (b > 0) {
            if ((b & 1) === 1) result = addMod(result, a);
            a = addMod(a, a);
            b >>>= 1;
        }
        return result;
    };
    let result = 1;
    let base = 2 % mod;
    for (let e = n; e > 0; e >>>= 1) {
        if ((e & 1) === 1) result = mulMod(result, base);
        base = mulMod(base, base);
    }
    return (result - 2 + mod) % mod;
}
