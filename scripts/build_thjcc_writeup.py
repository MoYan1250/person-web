"""Rebuild full THJCC writeup MDX from the original user transcript."""
from __future__ import annotations

import json
import re
from pathlib import Path

TRANSCRIPT = Path(
    r"C:\Users\approlu\.cursor\projects\f-PersonWeb\agent-transcripts"
    r"\dc563761-50ff-47e3-adb8-157de4f17e3f\dc563761-50ff-47e3-adb8-157de4f17e3f.jsonl"
)
OUT = Path(r"f:\PersonWeb\content\blog\zh\thjcc-2026-summer-writeup.mdx")

FRONTMATTER = """---
title: "THJCC 2026 summer Writeup"
date: "2026-08-17"
summary: "第一次 CTF 的解題紀錄，涵蓋 Misc、Forensic、Crypto、Pwn、Reverse。"
category: writeup
---

"""


def extract_body() -> str:
    line = TRANSCRIPT.read_text(encoding="utf-8").splitlines()[0]
    payload = json.loads(line)
    text = payload["message"]["content"][0]["text"]
    match = re.search(r"<user_query>\n(.*)\n</user_query>", text, re.DOTALL)
    if not match:
        raise RuntimeError("Could not find user_query in transcript")
    body = match.group(1)
    body = re.sub(
        r"^這篇是8\.17的文章,然後你新增一個標籤叫做 Writeup\n\n",
        "",
        body,
    )
    body = re.sub(r"^# THJCC 2026 summer Writeup\n\n", "", body)
    # HackMD spoiler/strike syntax -> standard markdown
    body = re.sub(r"\|\|~~(.*?)~~\|\|", r"~~\1~~", body)
    body = re.sub(r"\|\|(.*?)\|\|", r"\1", body)
    return body.strip() + "\n"


def main() -> None:
    body = extract_body()
    OUT.write_text(FRONTMATTER + body, encoding="utf-8")
    print(f"wrote {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
