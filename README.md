# Farmer Supporter

This project is to make a significant impact on the agricultural sector by assisting farmers in making informed decisions. This project focuses on leveraging AI to provide expert advice on crop management, market insights, and real-time problem-solving.

## Requirements

- Integrate features for adding and managing produce listings.
- Offer offline storage for articles and chat history.
- Include agricultural knowledge updates, weather forecasts, and pest alerts.
- Ensure the AI can guide through complex agricultural decisions.

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running
- OpenAI API key (Get yours [here](#))

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/mbamamykel77/Stutern-Klusterthon.git
    ```

2. Install dependencies:

    ```bash
    cd Stutern-Klusterthon
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory and add the following:

    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET = secret
    BCRYPT_SALT_ROUND=10
    ```

    Replace `your_mongodb_connection_string` and `your_openai_api_key` with your MongoDB connection string and OpenAI API key, respectively.

4. Run the application:

    ```bash
    npm start
    ```

    The application should be running at `http://localhost:7000`.

## API Documentation

For information on API endpoints and usage, refer to the [API Documentation](./Api_Documentation).

## Explore Models

- [OpenAI API - Introduction](#)
- [Mistral 7B - Introduction](#)
- [SeamlessM4T - Introduction](#)


## License

This project is licensed under the MIT License