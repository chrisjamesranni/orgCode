# GeoGuard: Disaster Awareness & Prediction Platform

GeoGuard is a comprehensive web application designed to provide crucial information and predictive insights about natural disasters in India. It aims to assist both the public and government authorities in disaster preparedness, response, and resource management. The platform integrates a machine learning model for flood prediction, a multi-lingual chatbot for instant information, and a rich awareness portal.

## Key Features

-   **Flood & Landslide Prediction**: Utilizes a machine learning model to predict the risk of floods and landslides for a given city based on real-time weather data from the Visual Crossing API.
-   **Interactive Chatbot**: A multi-lingual chatbot powered by NLTK that provides information on:
    -   Prevention, preparedness, and recovery measures for various disasters (floods, landslides, earthquakes, tsunamis, etc.).
    -   First-aid procedures.
    -   Early warning systems.
    -   Historical disaster events in India.
    -   State-wise emergency helpline numbers.
-   **Disaster Awareness Portal**:
    -   **Educational Videos**: Curated videos on safety and preparedness for different disasters.
    -   **Interactive Quiz**: Test user knowledge on disaster safety.
    -   **Preparedness Game**: An interactive game to learn about preparing for different disaster scenarios.
-   **Emergency Helplines**: A comprehensive, searchable directory of national and state-level emergency contact numbers.

## Technology Stack

-   **Backend**: Flask
-   **Machine Learning**: TensorFlow/Keras, Scikit-learn, NLTK, Pandas
-   **Frontend**: HTML, CSS, JavaScript, Bootstrap
-   **APIs**:
    -   HERE Geocoding API (for city coordinates)
    -   Visual Crossing Weather API (for weather data)
    -   Google Translate API (for chatbot localization)
-   **Deployment**: Configured for Vercel

## Project Structure

```
Code/
├── api/
│   ├── index.py           # Main Flask application logic, API routes
│   └── training/
│       └── prediction.py  # Fetches weather data
├── data/                  # JSON data for chatbot (disasters, helplines)
├── model/
│   ├── model.pickle       # The prediction model used by the app
│   └── train.py           # Script to train the prediction model
├── static/                # CSS, JS, images, and other assets
├── templates/             # HTML templates for the web interface
├── chatbot.py             # Core logic for the disaster chatbot
├── app.py                 # An alternative/older version of the Flask app
├── requirements.txt       # Python dependencies
└── vercel.json            # Vercel deployment configuration
```

## Setup and Installation

1.  **Prerequisites**:
    -   Python 3.8+
    -   `pip` and `virtualenv`

2.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd orgCode/Code
    ```

3.  **Create and activate a virtual environment**:
    ```bash
    # For Windows
    python -m venv venv
    .\venv\Scripts\activate

    # For macOS/Linux
    python3 -m venv venv
    source venv/bin/activate
    ```

4.  **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

5.  **Download NLTK data**:
    The application will automatically download the necessary NLTK corpora (`stopwords`, `wordnet`) on its first run.

6.  **API Keys**:
    The application requires API keys for external services. These are currently hardcoded but should be set as environment variables for production.
    -   **HERE API Key**: Found in `api/index.py`. Used for geocoding city names to coordinates.
    -   **Visual Crossing API Key**: Found in `api/training/prediction.py`. Used for fetching weather forecast data.

7.  **Run the application**:
    The main entry point for the Vercel deployment is `api/index.py`. To run it locally:
    ```bash
    flask --app api.index run
    ```
    The application will be available at `http://127.0.0.1:5000`.

## How It Works

### Prediction

When a user enters a city name on the "Predict" page, the application performs the following steps:
1.  Uses the **HERE Geocoding API** to convert the city name into latitude and longitude.
2.  Fetches a 15-day weather forecast from the **Visual Crossing Weather API** using these coordinates.
3.  Processes the weather data (temperature, wind speed, cloud cover, precipitation, humidity).
4.  Feeds the processed data into a pre-trained machine learning model (`model/model.pickle`) to predict the flood/landslide risk.
5.  Displays the prediction and the weather data to the user.

### Chatbot

The chatbot is a rule-based system that leverages NLTK for Natural Language Processing:
1.  **Preprocessing**: User input is tokenized, lemmatized, and cleared of stopwords.
2.  **Keyword Extraction**: The chatbot identifies keywords related to disaster types (e.g., `flood`), categories (e.g., `prevention`, `recovery`), locations, and years.
3.  **Response Generation**: Based on the extracted keywords, it retrieves the most relevant information from its JSON-based knowledge base (`data/`).
4.  **Translation**: It integrates with the **Google Translate API** to detect the user's language and provide responses in one of several supported Indian languages.

---

*This project was developed to enhance disaster awareness and provide early warnings to help save lives and resources.*
