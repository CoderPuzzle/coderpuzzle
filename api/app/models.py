from typing import Any

from pydantic import BaseModel, Field


class RunRequest(BaseModel):
    slug: str
    language: str = "python3"
    code: str = Field(min_length=1, max_length=100_000)
    cases: list[dict[str, Any]] | None = Field(default=None, max_length=20)


class SubmitRequest(BaseModel):
    slug: str
    language: str = "python3"
    code: str = Field(min_length=1, max_length=100_000)


class FormatRequest(BaseModel):
    # No slug: formatting depends on the language alone, never on the problem.
    language: str = "python3"
    code: str = Field(min_length=1, max_length=100_000)

