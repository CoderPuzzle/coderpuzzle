function areNumbersAscending(s: string): boolean {
    let previous = 0;

    for (const token of s.split(" ")) {
        if (token[0] >= "0" && token[0] <= "9") {
            const current = Number(token);
            if (current <= previous) {
                return false;
            }
            previous = current;
        }
    }

    return true;
}
