# TODO: Add Loading Effects to Buttons

## Tasks
- [x] Update `src/components/AdminActions.tsx` to add loading state for edit button
- [x] Update `src/components/AdminActions.module.css` for loading state styling if needed
- [x] Update `src/app/admin/page.tsx` to add loading state for "Create New Blog" and "Manage Blogs" buttons
- [x] Update `src/app/admin/page.module.css` for loading state styling if needed
- [x] Test the loading effects
- [x] Fix delete modal issue by moving AdminActions code into BlogCard
- [x] Make modal background inaccessible when modal is open

## Details
- Convert Links to buttons with onClick handlers
- Add loading states for navigation
- Use LoadingSpinner component for visual feedback
- Disable buttons during loading
- Navigate programmatically after setting loading state
