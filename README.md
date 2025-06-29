# AI-Powered Data Visualization Platform

A modern Next.js application that enables users to upload data files (CSV, JSON, Excel), extract structured data using Google's Generative AI, and visualize the results with interactive charts.

## 🚀 Features

- **File Upload & Processing**: Support for CSV, JSON, and Excel files
- **AI-Powered Data Extraction**: Uses Google Gemini AI to intelligently parse and structure data
- **Interactive Visualizations**: Dynamic charts and graphs using Chart.js
- **Google Authentication**: Secure user authentication with NextAuth
- **Real-time Processing**: Live data processing and visualization updates
- **Responsive Design**: Mobile-friendly interface

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TailwindCSS
- **Authentication**: NextAuth.js with Google OAuth
- **AI Integration**: Google Generative AI (Gemini)
- **Charts**: Chart.js with React wrapper
- **File Processing**: xlsx for Excel files
- **Deployment**: Vercel-ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd index
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Google AI Configuration
   GOOGLE_GENAI_API_KEY=your_google_ai_api_key
   
   # Google OAuth Configuration
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   
   # NextAuth Configuration
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Required Dependencies

```bash
# Core dependencies
npm install next react react-dom next-auth @auth/google-provider chart.js react-chartjs-2 xlsx @google/generative-ai
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── ai/
│   │       └── extractData/
│   │           └── route.js          # AI data extraction API
│   ├── components/
│   │   ├── Header.js                 # Navigation component
│   │   └── Graphs.js                 # Chart visualization component
│   ├── direct/
│   │   └── report/
│   │       └── page.js               # Data visualization page
│   └── page.js                       # Home page
├── .env.local                        # Environment variables
└── next.config.js                    # Next.js configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Cloud account (for AI API)
- Google OAuth app credentials

### Setup Instructions

1. **Google AI API Setup**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create an API key for Gemini
   - Add it to your `.env.local` file

2. **Google OAuth Setup**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`

3. **NextAuth Secret**
   ```bash
   # Generate a secret
   openssl rand -base64 32
   ```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m "Add: your feature description"
   ```
5. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and conventions
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed

## 📝 API Endpoints

### POST `/api/ai/extractData`
Processes uploaded files and extracts structured data using AI.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: file (CSV, JSON, or Excel)

**Response:**
```json
{
  "fileInfo": {
    "name": "filename.csv",
    "type": "text/csv",
    "size": 1024
  },
  "parsedData": {
    "headers": ["col1", "col2"],
    "rows": [["val1", "val2"]]
  },
  "metadata": {
    "processedAt": "2025-06-29T...",
    "fileType": "csv"
  }
}
```

## 🐛 Known Issues

- Large Excel files (>10MB) may timeout during processing
- AI processing requires valid Google AI API key
- Chart rendering may be slow with large datasets

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Google Generative AI](https://ai.google.dev/)
- [Chart.js Documentation](https://www.chartjs.org/docs/)
- [NextAuth.js Documentation](https://next-auth.js.org/)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Google Generative AI for intelligent data processing
- Chart.js community for visualization components
- NextAuth.js for authentication
- Vercel for hosting platform

---

**Happy Contributing! 🎉**

For questions or support, please open an issue or reach out