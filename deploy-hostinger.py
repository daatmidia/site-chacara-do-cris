#!/usr/bin/env python3
"""Envia o site para public_html na Hostinger via FTP."""

from __future__ import annotations

import ftplib
import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
REMOTE_DIR = "domains/chacaradocris.com/public_html"
SKIP_NAMES = {
    ".git",
    ".github",
    ".DS_Store",
    "site-chacara-do-cris-deploy.zip",
    "deploy-hostinger.py",
    "README.md",
    "netlify.toml",
    ".gitignore",
    ".gitattributes",
    "CNAME",
}


def should_skip(path: Path) -> bool:
    parts = set(path.relative_to(ROOT).parts)
    return bool(parts & SKIP_NAMES) or any(
        part.startswith(".git") for part in path.relative_to(ROOT).parts
    )


def ensure_remote_dir(ftp: ftplib.FTP, remote_path: str) -> None:
    if not remote_path or remote_path == ".":
        return

    ftp.cwd("/")
    for part in remote_path.split("/"):
        try:
            ftp.cwd(part)
        except ftplib.error_perm:
            ftp.mkd(part)
            ftp.cwd(part)


def upload_tree(ftp: ftplib.FTP, local_root: Path, remote_root: str) -> None:
    uploaded = 0

    for local_path in sorted(local_root.rglob("*")):
        if local_path.is_dir() or should_skip(local_path):
            continue

        rel = local_path.relative_to(local_root).as_posix()
        remote_dir = remote_root if Path(rel).parent.as_posix() == "." else f"{remote_root}/{Path(rel).parent.as_posix()}"

        ftp.cwd("/")
        ensure_remote_dir(ftp, remote_dir)

        with local_path.open("rb") as handle:
            ftp.storbinary(f"STOR {Path(rel).name}", handle)

        uploaded += 1
        if uploaded % 10 == 0 or uploaded <= 5:
            print(f"OK ({uploaded}) {rel}")

    print(f"\nConcluido: {uploaded} arquivos enviados para /{remote_root}/")


def main() -> int:
    host = os.environ.get("HOSTINGER_FTP_HOST", "").strip()
    user = os.environ.get("HOSTINGER_FTP_USER", "").strip()
    password = os.environ.get("HOSTINGER_FTP_PASS", "").strip()

    if len(sys.argv) == 4:
        host, user, password = sys.argv[1:4]

    if not host or not user or not password:
        print(
            "Uso:\n"
            "  HOSTINGER_FTP_HOST=... HOSTINGER_FTP_USER=... HOSTINGER_FTP_PASS=... python3 deploy-hostinger.py\n"
            "  python3 deploy-hostinger.py HOST USER PASS",
            file=sys.stderr,
        )
        return 1

    print(f"Conectando em {host}...")
    ftp = ftplib.FTP(host, timeout=120)
    ftp.login(user, password)
    ftp.set_pasv(True)

    try:
        upload_tree(ftp, ROOT, REMOTE_DIR)
    finally:
        ftp.quit()

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
