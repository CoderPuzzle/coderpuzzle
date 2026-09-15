function totalWaviness(num1: number, num2: number): number {
    // f(N) = total waviness of 1..N; the answer telescopes to
    // f(num2) - f(num1 - 1). Two parallel tables track live prefixes by
    // (started, last digit, second-last digit): "tight" prefixes still equal
    // to N's prefix and "free" prefixes already below it. Digit 10 stands
    // for "no digit yet". Every accumulated value is bounded by the largest
    // achievable answer, f(10^15) = 7.36e15 < 2^53, so plain numbers are
    // exact.
    const digitsOf = function (n: number): number[] {
        const digits: number[] = [];
        while (n > 0) {
            digits.push(n % 10);
            n = Math.floor(n / 10);
        }
        return digits.reverse();
    };

    const f = function (input: number): number {
        if (input <= 0) {
            return 0;
        }
        const digits = digitsOf(input);
        const NONE = 10;

        const blank = function (): number[][][] {
            // two started-flags x 11 last digits x 11 second-last digits
            const table = function (): number[][] {
                const rows: number[][] = new Array(11);
                for (let i = 0; i < 11; ++i) rows[i] = new Array(11).fill(0);
                return rows;
            };
            return [table(), table()];
        };

        let tightCnt = blank();
        let tightWav = blank();
        let freeCnt = blank();
        let freeWav = blank();
        tightCnt[0][NONE][NONE] = 1;
        for (const limit of digits) {
            const nTightCnt = blank();
            const nTightWav = blank();
            const nFreeCnt = blank();
            const nFreeWav = blank();
            for (let group = 0; group < 2; ++group) {
                const tight = group === 0;
                const cnt = tight ? tightCnt : freeCnt;
                const wav = tight ? tightWav : freeWav;
                const hi = tight ? limit : 9;
                for (let s = 0; s <= 1; ++s) {
                    for (let d1 = 0; d1 <= 10; ++d1) {
                        for (let d2 = 0; d2 <= 10; ++d2) {
                            const count = cnt[s][d1][d2];
                            if (count === 0) {
                                continue;
                            }
                            const total = wav[s][d1][d2];
                            for (let x = 0; x <= hi; ++x) {
                                const started = s === 1 || x !== 0 ? 1 : 0;
                                let gain = 0;
                                let nd1: number;
                                let nd2: number;
                                if (s === 1) {
                                    if (d2 !== NONE) {
                                        if ((d1 > d2 && d1 > x) || (d1 < d2 && d1 < x)) {
                                            gain = 1;
                                        }
                                    }
                                    nd1 = x;
                                    nd2 = d1;
                                } else if (started === 1) {
                                    nd1 = x;
                                    nd2 = NONE;
                                } else {
                                    nd1 = NONE;
                                    nd2 = NONE;
                                }
                                const acc = total + gain * count;
                                if (tight && x === hi) {
                                    nTightCnt[started][nd1][nd2] += count;
                                    nTightWav[started][nd1][nd2] += acc;
                                } else {
                                    nFreeCnt[started][nd1][nd2] += count;
                                    nFreeWav[started][nd1][nd2] += acc;
                                }
                            }
                        }
                    }
                }
            }
            tightCnt = nTightCnt;
            tightWav = nTightWav;
            freeCnt = nFreeCnt;
            freeWav = nFreeWav;
        }
        let grand = 0;
        for (const tab of [tightWav, freeWav]) {
            for (let s = 0; s <= 1; ++s) {
                for (let d1 = 0; d1 <= 10; ++d1) {
                    for (let d2 = 0; d2 <= 10; ++d2) {
                        grand += tab[s][d1][d2];
                    }
                }
            }
        }
        return grand;
    };

    return f(num2) - f(num1 - 1);
}
