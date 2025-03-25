import os
from dotenv import load_dotenv

# Load environment variables from .env file if it exists
# This is useful for local development in VS Code
if os.path.exists('.env'):
    print("Loading environment variables from .env file")
    load_dotenv()

from app import app

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
