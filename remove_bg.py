import os
from PIL import Image, ImageFilter

images = [
    ('img-airplane-3d.jpg', 'img-airplane-3d.png', 230),
    ('img-passport-3d.jpg', 'img-passport-3d.png', 225),
    ('img-gradcap-3d.jpg', 'img-gradcap-3d.png', 230),
    ('img-book-3d.jpg', 'img-book-3d.png', 220),
    ('img-trophy-3d.jpg', 'img-trophy-3d.png', 230),
    ('img-backpack-3d.jpg', 'img-backpack-3d.png', 225),
]

for src, dst, threshold in images:
    if not os.path.exists(src):
        continue
    img = Image.open(src).convert('RGBA')
    width, height = img.size
    pixels = img.load()
    
    # Sample background color from corners
    corner_samples = [
        pixels[0, 0], pixels[width-1, 0], pixels[0, height-1], pixels[width-1, height-1],
        pixels[2, 2], pixels[width-3, 2], pixels[2, height-3], pixels[width-3, height-3]
    ]
    avg_bg_r = sum(c[0] for c in corner_samples) / len(corner_samples)
    avg_bg_g = sum(c[1] for c in corner_samples) / len(corner_samples)
    avg_bg_b = sum(c[2] for c in corner_samples) / len(corner_samples)
    
    # BFS Flood fill from edges
    from collections import deque
    visited = [[False]*height for _ in range(width)]
    queue = deque()
    
    def is_bg_color(r, g, b):
        lum = 0.299 * r + 0.587 * g + 0.114 * b
        color_dist = ((r - avg_bg_r)**2 + (g - avg_bg_g)**2 + (b - avg_bg_b)**2)**0.5
        return (lum > threshold and color_dist < 55) or (lum > 245 and color_dist < 70)
        
    for x in range(width):
        for y in [0, height-1]:
            r, g, b, _ = pixels[x, y]
            if is_bg_color(r, g, b) and not visited[x][y]:
                visited[x][y] = True
                queue.append((x, y))
                
    for y in range(height):
        for x in [0, width-1]:
            r, g, b, _ = pixels[x, y]
            if is_bg_color(r, g, b) and not visited[x][y]:
                visited[x][y] = True
                queue.append((x, y))
                
    while queue:
        cx, cy = queue.popleft()
        for nx, ny in ((cx+1, cy), (cx-1, cy), (cx, cy+1), (cx, cy-1)):
            if 0 <= nx < width and 0 <= ny < height and not visited[nx][ny]:
                r, g, b, _ = pixels[nx, ny]
                if is_bg_color(r, g, b):
                    visited[nx][ny] = True
                    queue.append((nx, ny))
                    
    # Create mask image
    mask = Image.new('L', (width, height), 255)
    mask_pixels = mask.load()
    for x in range(width):
        for y in range(height):
            if visited[x][y]:
                mask_pixels[x, y] = 0
                
    # Smooth edge with slight Gaussian blur
    mask = mask.filter(ImageFilter.GaussianBlur(radius=1.0))
    
    img.putalpha(mask)
    
    # Crop to content
    bbox = img.getbbox()
    if bbox:
        cropped = img.crop(bbox)
        # Pad to square
        max_side = max(cropped.size)
        final_img = Image.new('RGBA', (max_side + 30, max_side + 30), (0, 0, 0, 0))
        final_img.paste(cropped, ((max_side + 30 - cropped.width)//2, (max_side + 30 - cropped.height)//2))
        final_img.save(dst, 'PNG')
    else:
        img.save(dst, 'PNG')
    print(f"Salvo com sucesso: {dst}")

print("Todos os objetos recortados com sucesso!")
