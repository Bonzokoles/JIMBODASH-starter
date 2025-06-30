import ollama
import json

class AIChat:
    def __init__(self):
        self.model = None
        # Initialize model on startup
        self.initialize_model()

    def initialize_model(self, model_name="llama2"):
        try:
            # Use ollama.show to check if model exists locally
            ollama.show(model_name)
            self.model = model_name
            print(f"Ollama model '{model_name}' is available.")
            return True
        except Exception as e:
            print(f"Error checking Ollama model '{model_name}': {e}")
            print("Please ensure Ollama is running and the model is downloaded (e.g., run 'ollama run llama2' in your terminal).")
            self.model = None
            return False

    def get_response(self, user_input):
        if not user_input:
            return "Please provide a message."
        if not self.model:
            return "AI model not loaded. Please check server logs and ensure Ollama is running."

        try:
            # Use ollama.generate which returns a dictionary
            response = ollama.generate(
                model=self.model,
                prompt=user_input,
                options={
                    'num_predict': 200
                },
                stream=False
            )
            # The actual response text is in the 'response' key
            return response.get('response', 'No response generated.')
        except Exception as e:
            return f"Error generating response from Ollama: {str(e)}"