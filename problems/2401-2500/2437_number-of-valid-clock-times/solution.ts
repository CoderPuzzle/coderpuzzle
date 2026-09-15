function countTime(time: string): number {
    // Count the valid hours and the valid minutes independently; the two
    // fields never constrain each other, so the answer is their product.
    // A field with no ? has exactly one value if it is itself in range,
    // which the given format guarantees.
    const hTens: string = time[0];
    const hOnes: string = time[1];
    const mTens: string = time[3];
    const mOnes: string = time[4];

    let hours = 0;
    for (let h = 0; h < 24; ++h) {
        if ((hTens === "?" || Math.floor(h / 10) === +hTens) && (hOnes === "?" || h % 10 === +hOnes)) {
            ++hours;
        }
    }

    let minutes = 0;
    for (let m = 0; m < 60; ++m) {
        if ((mTens === "?" || Math.floor(m / 10) === +mTens) && (mOnes === "?" || m % 10 === +mOnes)) {
            ++minutes;
        }
    }

    return hours * minutes;
}
