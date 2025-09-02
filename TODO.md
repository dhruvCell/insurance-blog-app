# TODO: Add Search Bar to Blog Page

## Steps to Complete:
- [ ] Create src/components/BlogSearch.tsx: Client component for search bar and filtered blog list
- [ ] Update src/app/blogs/page.tsx: Integrate BlogSearch component
- [ ] Update CSS styles if needed in src/app/blogs/page.module.css
- [ ] Test search functionality

## Details:
- BlogSearch component will fetch blogs on mount, provide search input, filter blogs by title/headline/content, and render filtered BlogCard components
- Update blogs page to use BlogSearch instead of direct rendering
- Ensure responsive design and proper styling
