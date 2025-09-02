# Blog App Template

A professional, full-stack blog application template built with Next.js 15, TypeScript, Tailwind CSS, and MongoDB.

## Features

- ✅ Modern Next.js 15 with App Router
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ MongoDB integration with Mongoose
- ✅ Responsive design
- ✅ Blog creation and management
- ✅ Clean, modular architecture
- ✅ Professional UI/UX

## Tech Stack

- **Frontend:** Next.js 15, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** MongoDB with Mongoose
- **Styling:** Tailwind CSS
- **Deployment:** Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or MongoDB Atlas)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd blog-app-template
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/blog-app
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog-app
```

4. Start MongoDB (if using local):
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or install MongoDB locally and start the service
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── api/blogs/          # API routes for blog CRUD
│   ├── blogs/              # Blog listing and individual blog pages
│   ├── create-blog/        # Blog creation page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/             # Reusable components
│   ├── BlogCard.tsx        # Blog card component
│   ├── BlogForm.tsx        # Blog creation form
│   └── Header.tsx          # Navigation header
└── lib/
    ├── models/Blog.ts      # Blog data model
    └── mongodb.ts          # Database connection
```

## Customization

### Changing the Theme

1. Update colors in `src/app/globals.css`
2. Modify Tailwind config in `tailwind.config.js`
3. Update metadata in `src/app/layout.tsx`

### Adding New Features

1. Create new components in `src/components/`
2. Add new API routes in `src/app/api/`
3. Update the database model in `src/lib/models/`

### Database Schema

The blog model includes:
- `title`: Blog title
- `headline`: Short description
- `content`: Full blog content (HTML)
- `image`: Image URL
- `createdAt`: Creation timestamp
- `updatedAt`: Update timestamp

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

This app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or issues, please open an issue on GitHub or contact the maintainers.
