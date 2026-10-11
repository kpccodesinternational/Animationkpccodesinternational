from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import random

# Create Flask App
app = Flask(__name__, static_folder="static")

# Allow frontend communication
CORS(app)


# ==============================
# COLOR ENGINE
# ==============================

colors = [
    "#ff0000",   # Red
    "#ff6600",   # Orange
    "#ffff00",   # Yellow
    "#00ff00",   # Green
    "#00ffff",   # Cyan
    "#0066ff",   # Blue
    "#6600ff",   # Purple
    "#ff00ff"    # Pink
]


def generate_color():
    """
    Generate random animated colors
    """
    return random.choice(colors)



def generate_speed():
    """
    Generate random animation speed
    """
    return random.randint(3, 10)



def generate_gradient():

    """
    Create dynamic gradient colors
    """

    color1 = random.choice(colors)
    color2 = random.choice(colors)
    color3 = random.choice(colors)

    return {
        "color1": color1,
        "color2": color2,
        "color3": color3
    }



# ==============================
# WEBSITE ROUTES
# ==============================


@app.route("/")
def home():

    return send_from_directory(
        "static",
        "index.html"
    )



# ==============================
# COLOR API
# ==============================


@app.route("/color")
def color():

    gradient = generate_gradient()


    return jsonify({

        "color": generate_color(),

        "speed": generate_speed(),

        "gradient": gradient

    })



# ==============================
# RUN SERVER
# ==============================


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )