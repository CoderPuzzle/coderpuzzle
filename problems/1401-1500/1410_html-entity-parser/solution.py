from typing import Dict, List


class Solution:
    def entityParser(self, text: str) -> str:
        entities: Dict[str, str] = {
            "&quot;": '"',
            "&apos;": "'",
            "&amp;": "&",
            "&gt;": ">",
            "&lt;": "<",
            "&frasl;": "/",
        }
        result: List[str] = []
        i = 0
        n = len(text)
        while i < n:
            if text[i] == "&":
                matched = False
                for entity, symbol in entities.items():
                    if text.startswith(entity, i):
                        result.append(symbol)
                        i += len(entity)
                        matched = True
                        break
                if not matched:
                    result.append(text[i])
                    i += 1
            else:
                result.append(text[i])
                i += 1
        return "".join(result)
