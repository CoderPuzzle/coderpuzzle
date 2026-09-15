function reformat(s: string): string {
    const letters: string[] = [];
    const digits: string[] = [];
    for (const c of s) {
        if (c >= "0" && c <= "9") {
            digits.push(c);
        } else {
            letters.push(c);
        }
    }
    const diff = letters.length - digits.length;
    if (diff > 1 || diff < -1) {
        return "";
    }
    const first = diff >= 0 ? letters : digits;
    const second = diff >= 0 ? digits : letters;
    let result = "";
    for (let i = 0; i < first.length; i++) {
        result += first[i];
        if (i < second.length) {
            result += second[i];
        }
    }
    return result;
}
