function numberOfSubstrings(s: string): number {
    const n = s.length;
    const zerosAt: number[] = [];
    for (let index = 0; index < n; index++) {
        if (s[index] === "0") {
            zerosAt.push(index);
        }
    }
    const totalZeros = zerosAt.length;
    let answer = 0;
    let firstZero = 0;
    for (let left = 0; left < n; left++) {
        while (firstZero < totalZeros && zerosAt[firstZero] < left) {
            firstZero++;
        }
        if (firstZero < totalZeros) {
            answer += zerosAt[firstZero] - left;
        } else {
            answer += n - left;
        }
        let need = 1;
        let j = 1;
        while (need <= n - left && firstZero + j - 1 < totalZeros) {
            let low = zerosAt[firstZero + j - 1];
            const required = left + need;
            if (required > low) {
                low = required;
            }
            const high = firstZero + j < totalZeros ? zerosAt[firstZero + j] : n;
            if (high > low) {
                answer += high - low;
            }
            j++;
            need += 2 * j;
        }
    }
    return answer;
}
