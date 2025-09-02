# TODO: Fix Blog Image Sizes and Layout

- [x] Update src/components/BlogCard.module.css to set fixed width and height for blog images on the blog list page
- [x] Swap image and content positions in BlogCard: image left, content right
- [x] Update BlogForm content textarea to rich text editor with full formatting capabilities

# TODO: Implement GridFS for Large Image Storage

- [x] Update Blog model to use imageId instead of image field
- [x] Implement GridFS storage in POST /api/blogs
- [x] Create GET /api/images/[id] endpoint to serve images from GridFS
- [x] Update frontend components to use new image API
- [x] Add backward compatibility for existing blogs
- [x] Fix Next.js 15 params awaiting issues
