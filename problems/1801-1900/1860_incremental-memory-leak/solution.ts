function memLeak(memory1: number, memory2: number): number[] {
    // Straight simulation: at most ~93k seconds for 2^31 inputs because the
    // consumed total grows quadratically.
    let a = memory1;
    let b = memory2;
    let t = 1;
    for (;;) {
        if (a >= b) {
            if (a < t) {
                break;
            }
            a -= t;
        } else {
            if (b < t) {
                break;
            }
            b -= t;
        }
        t++;
    }
    return [t, a, b];
}
