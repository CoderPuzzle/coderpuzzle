function entityParser(text: string): string {
    const entities: Record<string, string> = {
        "&quot;": '"',
        "&apos;": "'",
        "&amp;": "&",
        "&gt;": ">",
        "&lt;": "<",
        "&frasl;": "/",
    };
    let result = "";
    let i = 0;
    const n = text.length;
    while (i < n) {
        if (text[i] === "&") {
            let matched = false;
            for (const [entity, symbol] of Object.entries(entities)) {
                if (text.startsWith(entity, i)) {
                    result += symbol;
                    i += entity.length;
                    matched = true;
                    break;
                }
            }
            if (!matched) {
                result += text[i];
                i++;
            }
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}
