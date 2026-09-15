function nextClosestTime(time: string): string {
    // A candidate may reuse only digits already on the clock, so at
    // most 4^4 = 256 four-digit drawings cover everything. Keep the
    // drawings that are real clock times (hour < 24, minute < 60) and
    // pick the one whose wrapped lead over the input, (candidate -
    // input) mod 1440, is smallest. Seeding the answer with the input
    // itself at a full day's lead is the wrap: 23:59 comes around to
    // 22:22, 11:11 to itself.
    const present: boolean[] = new Array(10).fill(false);
    for (let i = 0; i < 5; i++) {
        if (i !== 2) {
            present[time.charCodeAt(i) - 48] = true;
        }
    }
    const digits: number[] = [];
    for (let d = 0; d < 10; d++) {
        if (present[d]) {
            digits.push(d);
        }
    }
    const hourTens = time.charCodeAt(0) - 48;
    const hourOnes = time.charCodeAt(1) - 48;
    const minuteTens = time.charCodeAt(3) - 48;
    const minuteOnes = time.charCodeAt(4) - 48;
    const start = (hourTens * 10 + hourOnes) * 60 + minuteTens * 10 + minuteOnes;
    let best = start;
    let bestGap = 1440;
    for (const h1 of digits) {
        for (const h2 of digits) {
            const hour = h1 * 10 + h2;
            if (hour >= 24) {
                continue;
            }
            for (const m1 of digits) {
                for (const m2 of digits) {
                    const minute = m1 * 10 + m2;
                    if (minute >= 60) {
                        continue;
                    }
                    const total = hour * 60 + minute;
                    const gap = (total - start + 1440) % 1440;
                    if (gap > 0 && gap < bestGap) {
                        bestGap = gap;
                        best = total;
                    }
                }
            }
        }
    }
    const hh = String(Math.floor(best / 60)).padStart(2, "0");
    const mm = String(best % 60).padStart(2, "0");
    return hh + ":" + mm;
}
