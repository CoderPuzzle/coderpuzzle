function possiblyEquals(s1: string, s2: string): boolean {
    const memo = new Map<string, boolean>();
    const isDigit = (character: string): boolean => character >= "0" && character <= "9";

    const search = (i: number, j: number, difference: number): boolean => {
        const key = `${i},${j},${difference}`;
        const cached = memo.get(key);
        if (cached !== undefined) return cached;
        if (i === s1.length && j === s2.length) return difference === 0;

        if (i < s1.length && isDigit(s1[i])) {
            let value = 0;
            for (let end = i; end < s1.length && end < i + 3 && isDigit(s1[end]); ++end) {
                value = value * 10 + Number(s1[end]);
                if (search(end + 1, j, difference + value)) {
                    memo.set(key, true);
                    return true;
                }
            }
        }

        if (j < s2.length && isDigit(s2[j])) {
            let value = 0;
            for (let end = j; end < s2.length && end < j + 3 && isDigit(s2[end]); ++end) {
                value = value * 10 + Number(s2[end]);
                if (search(i, end + 1, difference - value)) {
                    memo.set(key, true);
                    return true;
                }
            }
        }

        let answer = false;
        if (difference > 0 && j < s2.length && !isDigit(s2[j])) {
            answer = search(i, j + 1, difference - 1);
        } else if (difference < 0 && i < s1.length && !isDigit(s1[i])) {
            answer = search(i + 1, j, difference + 1);
        } else if (
            difference === 0 &&
            i < s1.length &&
            j < s2.length &&
            !isDigit(s1[i]) &&
            !isDigit(s2[j]) &&
            s1[i] === s2[j]
        ) {
            answer = search(i + 1, j + 1, 0);
        }
        memo.set(key, answer);
        return answer;
    };

    return search(0, 0, 0);
}
