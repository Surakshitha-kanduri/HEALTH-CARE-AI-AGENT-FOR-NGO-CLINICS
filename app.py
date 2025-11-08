from flask import Flask, request, jsonify
from openai import OpenAI
import googlemaps

app = Flask(__name__)
client = OpenAI(api_key="YOUR_OPENAI_API_KEY")
gmaps = googlemaps.Client(key="YOUR_GOOGLE_MAPS_API_KEY")

@app.route("/chat", methods=["POST"])
def chat():
    user_msg = request.json["message"]

    # Basic logic for health intent detection
    if "hospital" in user_msg.lower():
        nearby = gmaps.places_nearby(location="17.3850,78.4867", radius=5000, type="hospital")
        names = [place["name"] for place in nearby["results"][:3]]
        response = "Here are some nearby hospitals:\n" + "\n".join(names)
    else:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful rural health assistant who explains in simple language."},
                {"role": "user", "content": user_msg}
            ]
        )
        response = completion.choices[0].message.content

    return jsonify({"reply": response})

if __name__ == "__main__":
    app.run(debug=True)
