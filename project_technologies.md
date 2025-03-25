# 2025 Geoguard Flood and Landslide Prediction Chatbot

## Technologies and Dependencies

### Backend Framework
- **Flask**: Web framework for building the application's backend
- **Gunicorn**: WSGI HTTP server for running the Flask application
- **Werkzeug**: WSGI toolkit for utilities and middleware

### Database
- **Flask-SQLAlchemy**: ORM extension for Flask to interact with databases
- **SQLAlchemy**: Python SQL toolkit and ORM
- **PostgreSQL**: Database system (via psycopg2-binary)

### Natural Language Processing
- **NLTK (Natural Language Toolkit)**: Used for:
  - Tokenization and word stemming
  - Stopwords removal
  - WordNet lemmatization
- **Regex**: Pattern matching in user queries

### Translation Services
- **Google Translate API** (via googletrans): Provides translation capabilities for multilingual support
  - Supports 13 Indian languages including Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Odia, Punjabi, Assamese, and Urdu

### Frontend Technologies
- **HTML5**: Structure and content
- **CSS3**: Styling
- **Bootstrap (Dark Theme)**: Responsive design framework
  - Used Replit-themed bootstrap for dark theme styling
- **JavaScript/jQuery**: For interactivity
  - Asynchronous requests to the backend
  - Dynamic UI updates
  - Language selector functionality

### Data Storage
- **JSON**: For storing and retrieving data such as:
  - Disaster information (types, prevention measures, response strategies)
  - State-wise emergency helpline numbers
  - Historical disaster records

### Deployment
- **Replit**: Hosting and development platform
- **Environment Variables**: For configuration management

### Features Implemented
1. Comprehensive disaster information covering various types:
   - Floods, landslides, tsunamis, earthquakes, droughts
   - Cyclones, wildfires, heatwaves, industrial accidents, pandemics
2. Information categorization:
   - Prevention and preparation
   - During-disaster action steps
   - Recovery measures
   - First aid procedures
3. Detailed first aid kits for different disaster scenarios
4. State-wise emergency helpline numbers across India
5. Historical disaster data spanning the last 20 years
6. Early warning system information
7. Multi-language support with translation for all Indian languages
8. Natural language query processing
9. Historical event search capabilities by location and year

### Chatbot Intelligence
The chatbot uses a simplified natural language processing approach:
- Tokenization of user input
- Stopword removal
- Lemmatization to normalize words
- Pattern matching for intent recognition
- Keyword extraction for disaster types, locations, and years
- Custom logic for query classification