# TODO: Add Top Viewed Blogs Section to Admin Page

## Completed Tasks
- [x] Analyze existing admin page structure and related APIs
- [x] Create new API endpoint `/api/blogs/top-viewed` to fetch top 3 blogs by view count
- [x] Add state management for top viewed blogs in admin page
- [x] Implement fetch function for top viewed blogs
- [x] Integrate fetch call on authentication
- [x] Add "Top Viewed Blogs" section to admin page UI
- [x] Display up to 3 blogs with title and view count
- [x] Handle loading and empty states

## Files Modified
- `src/app/api/blogs/top-viewed/route.ts` (created)
- `src/app/admin/page.tsx` (updated)

## Next Steps
- Test the new API endpoint
- Verify the section displays correctly in the admin page
- Ensure proper error handling and loading states
