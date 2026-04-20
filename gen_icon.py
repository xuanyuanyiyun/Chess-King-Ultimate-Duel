import urllib.request
import urllib.parse
import json
import base64
import os
from PIL import Image

def generate_and_save_icon():
    # Use the coresg-normal.trae.ai endpoint as per image guidelines
    prompt = "A high-quality mobile game app icon for a cyberpunk Chinese chess game. The icon features a glowing neon 3D Chinese chess piece with the character '帅' surrounded by futuristic holographic energy rings and tech particles. Deep dark blue and vibrant neon red color palette, sci-fi style, centered, perfect for an app icon, masterpiece, intricate details, clean dark background."
    encoded_prompt = urllib.parse.quote(prompt)
    url = f"https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt={encoded_prompt}&image_size=square_hd"
    
    print(f"Downloading image from {url}")
    req = urllib.request.Request(url)
    
    try:
        with urllib.request.urlopen(req) as response:
            data = response.read()
            with open("/workspace/temp_icon.png", "wb") as f:
                f.write(data)
                
        # Resize to 300x300
        with Image.open("/workspace/temp_icon.png") as img:
            resized_img = img.resize((300, 300), Image.Resampling.LANCZOS)
            # Save as PNG
            resized_img.save("/workspace/icon.png", format="PNG", optimize=True)
            
        # Clean up
        if os.path.exists("/workspace/temp_icon.png"):
            os.remove("/workspace/temp_icon.png")
            
        size_kb = os.path.getsize("/workspace/icon.png") / 1024
        print(f"Successfully created icon.png (300x300), size: {size_kb:.2f} KB")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    generate_and_save_icon()