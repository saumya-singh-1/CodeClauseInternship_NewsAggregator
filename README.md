# News Aggregator

A modern, responsive news aggregator built with Next.js 15, React 19, and Tailwind CSS v4. Stay updated with the latest headlines from around the world.

## Features

- 📰 **Real-time News**: Get the latest headlines from NewsAPI
- 🔍 **Smart Search**: Search for specific news topics
- 📂 **Category Filtering**: Browse news by categories (General, Business, Sports, Technology, Health, Entertainment)
- 🌙 **Dark Mode**: Automatic dark/light mode based on system preference
- 📱 **Responsive Design**: Works perfectly on all devices
- ⚡ **Fast Performance**: Built with Next.js App Router for optimal performance

## Tech Stack

- **Frontend**: Next.js 15, React 19
- **Styling**: Tailwind CSS v4
- **API**: NewsAPI.org integration
- **Deployment**: Vercel ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd news_aggregator
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables:
Create a `.env.local` file in the root directory:
```env
NEWS_API_KEY=your_news_api_key_here
```

4. Get your NewsAPI key:
- Visit [NewsAPI.org](https://newsapi.org/)
- Sign up for a free account
- Copy your API key
- Paste it in the `.env.local` file

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
news_aggregator/
├── src/
│   └── app/
│       ├── api/
│       │   └── news/
│       │       └── route.js      # News API endpoint
│       ├── globals.css           # Global styles
│       ├── layout.js             # Root layout
│       └── page.js               # Home page
├── public/                       # Static assets
├── .env.local                    # Environment variables
└── package.json                  # Dependencies
```

## API Endpoints

- `GET /api/news` - Fetch news articles
  - Query params:
    - `q` - Search query
    - `category` - News category (general, business, sports, etc.)

## Deployment

This project is ready for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `NEWS_API_KEY` environment variable in Vercel
4. Deploy!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please open an issue on GitHub.
