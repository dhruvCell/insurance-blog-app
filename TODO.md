# Image Upload Implementation Plan

## Current State Analysis
- Upload API exists at `/api/images/upload` - handles file upload to GridFS
- Retrieval API exists at `/api/images/[id]` - serves images from GridFS
- BlogForm currently uses base64 encoding and sends to blogs API
- Blogs API currently handles base64 conversion to GridFS itself (redundant)

## Tasks
- [ ] Modify BlogForm to upload image via `/api/images/upload` API
- [ ] Update BlogForm interface to send `imageId` instead of base64 `image`
- [ ] Modify blogs API POST route to accept `imageId` instead of base64
- [ ] Update image display components to use `/api/images/[id]` for retrieval
- [ ] Test the complete flow: upload -> create blog -> display image
- [ ] Handle edit blog functionality for image updates

## Files to Modify
- `src/components/BlogForm.tsx` - Change image handling to use upload API
- `src/app/api/blogs/route.ts` - Update POST to accept imageId
- `src/components/BlogCard.tsx` - Update image src to use retrieval API
- `src/app/blogs/[id]/page.tsx` - Update image display
- `src/app/edit-blog/[id]/page.tsx` - Handle image updates in edit mode
