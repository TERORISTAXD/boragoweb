# Team Member Images

This folder contains profile images for team members displayed on the `/team` page.

## Required Images

You need to add the following team member images:

1. **member-1.jpg** - Bonnie Green (CEO / Co-founder)
2. **member-2.jpg** - Helene Engels (CTO / Co-founder)
3. **member-3.jpg** - Jese Leos (SEO & Marketing)
4. **member-4.jpg** - Joseph Mcfall (Sales)

## Image Specifications

- **Format**: JPG, PNG, or WebP
- **Recommended Size**: 400x400px (square)
- **Aspect Ratio**: 1:1 (square)
- **File Size**: Keep under 500KB for optimal performance
- **Background**: Professional headshot with clean background

## How to Add Images

1. Place your team member photos in this folder
2. Name them exactly as shown above: `member-1.jpg`, `member-2.jpg`, etc.
3. Or update the team array in `/app/team/page.tsx` with your preferred filenames

## Updating Team Members

To change team member information, edit `/app/team/page.tsx`:

```tsx
const team = [
  {
    name: "Your Name",
    role: "Your Role",
    img: "/team/your-image.jpg",
  },
  // Add more team members...
];
```

## Placeholder Images

Until you add your own images, you can use placeholder services like:
- https://ui-avatars.com/api/?name=John+Doe&size=400
- https://i.pravatar.cc/400
- Or create simple colored squares as placeholders
