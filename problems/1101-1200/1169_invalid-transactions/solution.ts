function invalidTransactions(transactions: string[]): string[] {
    const parsed = transactions.map((t) => t.split(","));
    const flags = new Array<boolean>(parsed.length).fill(false);
    // An amount over the limit convicts on its own; otherwise the
    // transaction waits for a same-name partner in another city within
    // 60 minutes — which may appear anywhere in the array.
    for (let i = 0; i < parsed.length; i++) {
        if (Number(parsed[i][2]) > 1000) {
            flags[i] = true;
            continue;
        }
        for (let j = 0; j < parsed.length; j++) {
            if (i === j || parsed[j][0] !== parsed[i][0] || parsed[j][3] === parsed[i][3]) {
                continue;
            }
            if (Math.abs(Number(parsed[i][1]) - Number(parsed[j][1])) <= 60) {
                flags[i] = true;
                break;
            }
        }
    }
    const invalid: string[] = [];
    for (let i = 0; i < parsed.length; i++) {
        if (flags[i]) {
            invalid.push(transactions[i]);
        }
    }
    return invalid;
}
