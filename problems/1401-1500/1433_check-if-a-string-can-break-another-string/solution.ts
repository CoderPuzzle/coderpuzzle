function checkIfCanBreak(s1: string, s2: string): boolean {
    const a = s1.split("").sort();
    const b = s2.split("").sort();
    const dominates = (x: string[], y: string[]): boolean => {
        for (let i = 0; i < x.length; i++) {
            if (x[i] < y[i]) {
                return false;
            }
        }
        return true;
    };
    return dominates(a, b) || dominates(b, a);
}
