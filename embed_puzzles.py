import json
import re

def embed_puzzles():
    with open('/workspace/puzzles.json', 'r', encoding='utf-8') as f:
        puzzles_data = f.read()

    with open('/workspace/index.html', 'r', encoding='utf-8') as f:
        html_content = f.read()

    # Find the PRACTICE_PUZZLES array and replace it with our 100 puzzles
    # Using regex to find the const PRACTICE_PUZZLES = [...];
    pattern = re.compile(r'const PRACTICE_PUZZLES = \[.*?\];', re.DOTALL)
    
    # We embed the raw JSON data
    replacement = f'const PRACTICE_PUZZLES = {puzzles_data};'
    
    new_html = pattern.sub(replacement, html_content)

    with open('/workspace/index.html', 'w', encoding='utf-8') as f:
        f.write(new_html)
        
    print("Puzzles embedded successfully into index.html.")

if __name__ == '__main__':
    embed_puzzles()
