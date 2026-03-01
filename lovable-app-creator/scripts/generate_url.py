#!/usr/bin/env python3
"""
Lovable URL Generator - converts a text prompt into a Lovable build URL.

Usage:
  python3 generate_url.py "Your prompt text here"
  echo "Your prompt" | python3 generate_url.py
  python3 generate_url.py --file prompt.txt
"""
import sys
import urllib.parse

def generate_url(prompt: str) -> str:
    encoded = urllib.parse.quote(prompt.strip(), safe='')
    return f"https://lovable.dev/?autosubmit=true#prompt={encoded}"

if __name__ == "__main__":
    if len(sys.argv) > 1:
        if sys.argv[1] == "--file":
            with open(sys.argv[2], 'r') as f:
                prompt = f.read()
        else:
            prompt = " ".join(sys.argv[1:])
    else:
        prompt = sys.stdin.read()
    
    if not prompt.strip():
        print("Error: No prompt provided", file=sys.stderr)
        sys.exit(1)
    
    url = generate_url(prompt)
    print(url)
