from .base import ExecutorError, LanguageExecutor
from .cpp import CppExecutor
from .javascript import JavaScriptExecutor
from .go import GoExecutor
from .java import JavaExecutor
from .python3 import Python3Executor
from .rust import RustExecutor
from .shell import ShellExecutor
from .sql import SqlExecutor
from .typescript import TypeScriptExecutor

_EXECUTORS: dict[str, LanguageExecutor] = {
    CppExecutor.language: CppExecutor(),
    GoExecutor.language: GoExecutor(),
    JavaScriptExecutor.language: JavaScriptExecutor(),
    JavaExecutor.language: JavaExecutor(),
    Python3Executor.language: Python3Executor(),
    RustExecutor.language: RustExecutor(),
    ShellExecutor.language: ShellExecutor(),
    SqlExecutor.language: SqlExecutor(),
    TypeScriptExecutor.language: TypeScriptExecutor(),
}


def get_executor(language: str) -> LanguageExecutor:
    try:
        return _EXECUTORS[language]
    except KeyError as error:
        raise ExecutorError(f"No executor plugin is installed for {language!r}") from error


def supported_languages() -> tuple[str, ...]:
    return tuple(sorted(_EXECUTORS))
