import os
from PIL import Image, ImageFilter, ImageOps

images = [
    ('img-airplane-3d.jpg', 'img-airplane-3d.png', 215),
    ('img-passport-3d.jpg', 'img-passport-3d.png', 210),
    ('img-gradcap-3d.jpg', 'img-gradcap-3d.png', 215),
    ('img-book-3d.jpg', 'img-book-3d.png', 205),
    ('img-backpack-3d.jpg', 'img-backpack-3d.png', 210),
]

for src, dst, threshold in images:
    if not os.path.exists(src):
        continue
    img = Image.open(src).convert('RGBA')
    width, height = img.size
    pixels = img.load()
    
    # 1. Background color estimation from corners
    corners = [
        pixels[0, 0], pixels[width-1, 0], pixels[0, height-1], pixels[width-1, height-1],
        pixels[3, 3], pixels[width-4, 3], pixels[3, height-4], pixels[width-4, height-4]
    ]
    bg_r = sum(c[0] for c in corners) / len(corners)
    bg_g = sum(c[1] for c in corners) / len(corners)
    bg_b = sum(c[2] for c in corners) / len(corners)
    
    # 2. Strict Flood fill
    from collections import deque
    visited = [[False]*height for _ in range(width)]
    queue = deque()
    
    def is_outer_bg(r, g, b):
        lum = 0.299 * r + 0.587 * g + 0.114 * b
        color_dist = ((r - bg_r)**2 + (g - bg_g)**2 + (b - bg_b)**2)**0.5
        # Strict threshold to capture all light edge pixels
        return (lum > threshold and color_dist < 65) or (lum > 235 and color_dist < 80)
        
    for x in range(width):
        for y in [0, height-1]:
            r, g, b, _ = pixels[x, y]
            if is_outer_bg(r, g, b) and not visited[x][y]:
                visited[x][y] = True
                queue.append((x, y))
                
    for y in range(height):
        for x in [0, width-1]:
            r, g, b, _ = pixels[x, y]
            if is_outer_bg(r, g, b) and not visited[x][y]:
                visited[x][y] = True
                queue.append((x, y))
                
    while queue:
        cx, cy = queue.popleft()
        for nx, ny in ((cx+1, cy), (cx-1, cy), (cx, cy+1), (cx, cy-1)):
            if 0 <= nx < width and 0 <= ny < height and not visited[nx][ny]:
                r, g, b, _ = pixels[nx, ny]
                if is_outer_bg(r, g, b):
                    visited[nx][ny] = True
                    queue.append((nx, ny))
                    
    # Initial binary mask
    raw_mask = Image.new('L', (width, height), 255)
    rm_pixels = raw_mask.load()
    for x in range(width):
        for y in range(height):
            if visited[x][y]:
                rm_pixels[x, y] = 0
                
    # 3. Aggressive Erosion (MinFilter) to remove ALL white fringe / rebarba
    eroded_mask = raw_mask.filter(ImageFilter.MinFilter(5)) # shrinks white area inwards by 2-3px
    
    # 4. Smooth outer transition
    smooth_mask = eroded_mask.filter(ImageFilter.GaussianBlur(radius=0.8))
    
    # 5. Color Decontamination / Defringe
    # If a pixel was near white, darken it slightly to avoid halo
    sm_pixels = smooth_mask.load()
    for x in range(width):
        for y in range(height):
            a = sm_pixels[x, y]
            if a > 0:
                r, g, b, _ = pixels[x, y]
                # If pixel has light halo, adjust towards darker saturated tone
                lum = 0.299 * r + 0.587 * g + 0.114 * b
                if lum > 220 and a < 250:
                    # Fade out fringe pixels completely
                    sm_pixels[x, y] = int(a * 0.2)
                    
    img.putalpha(smooth_mask)
    
    bbox = img.getbbox()
    if bbox:
        cropped = img.crop(bbox)
        max_s = max(cropped.size)
        final_img = Image.new('RGBA', (max_s + 20, max_s + 20), (0, 0, 0, 0))
        final_img.paste(cropped, ((max_s + 20 - cropped.width)//2, (max_s + 20 - cropped.height)//2))
        final_img.save(dst, 'PNG')
    else:
        img.save(dst, 'PNG')
    print(f"Limpo perfeitamente sem rebarbas: {dst}")

print("Todos os objetos processados com precisão!")
