from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import string
import os

app = Flask(__name__)
CORS(app)

# Abbreviation dictionaries
TIMEZONE_ABBREVIATIONS = {
    'MST': 'Mountain Standard Time',
    'EST': 'Eastern Standard Time',
    'PST': 'Pacific Standard Time',
    'CST': 'Central Standard Time',
    'GMT': 'Greenwich Mean Time'
}

NEW_AGE_ABBREVIATIONS = {
    'LOL': 'Laugh Out Loud',
    'BRB': 'Be Right Back',
    'OMG': 'Oh My God',
    'IMHO': 'In My Humble Opinion',
    'FOMO': 'Fear Of Missing Out'
}

@app.route('/api/calculator/add', methods=['POST'])
def add():
    try:
        data = request.get_json()
        num1 = float(data.get('num1'))
        num2 = float(data.get('num2'))
        result = num1 + num2
        return jsonify({
            'success': True,
            'result': result,
            'operation': 'addition'
        })
    except (TypeError, ValueError, KeyError) as e:
        return jsonify({
            'success': False,
            'error': 'Invalid input. Please provide num1 and num2 as numbers.'
        }), 400

@app.route('/api/calculator/subtract', methods=['POST'])
def subtract():
    try:
        data = request.get_json()
        num1 = float(data.get('num1'))
        num2 = float(data.get('num2'))
        result = num1 - num2
        return jsonify({
            'success': True,
            'result': result,
            'operation': 'subtraction'
        })
    except (TypeError, ValueError, KeyError) as e:
        return jsonify({
            'success': False,
            'error': 'Invalid input. Please provide num1 and num2 as numbers.'
        }), 400

@app.route('/api/abbreviation/time_zones', methods=['POST'])
def expand_timezone():
    try:
        data = request.get_json()
        abbreviation = data.get('abbreviation', '').upper()
        
        if abbreviation in TIMEZONE_ABBREVIATIONS:
            return jsonify({
                'success': True,
                'abbreviation': abbreviation,
                'expansion': TIMEZONE_ABBREVIATIONS[abbreviation]
            })
        else:
            return jsonify({
                'success': False,
                'error': f'Timezone abbreviation "{abbreviation}" not found.',
                'available': list(TIMEZONE_ABBREVIATIONS.keys())
            }), 404
    except Exception as e:
        return jsonify({
            'success': False,
            'error': 'Invalid request format.'
        }), 400

@app.route('/api/abbreviation/new_age_expansions', methods=['POST'])
def expand_new_age():
    try:
        data = request.get_json()
        abbreviation = data.get('abbreviation', '').upper()
        
        if abbreviation in NEW_AGE_ABBREVIATIONS:
            return jsonify({
                'success': True,
                'abbreviation': abbreviation,
                'expansion': NEW_AGE_ABBREVIATIONS[abbreviation]
            })
        else:
            return jsonify({
                'success': False,
                'error': f'New age abbreviation "{abbreviation}" not found.',
                'available': list(NEW_AGE_ABBREVIATIONS.keys())
            }), 404
    except Exception as e:
        return jsonify({
            'success': False,
            'error': 'Invalid request format.'
        }), 400

@app.route('/api/credentials_generator/generate_username', methods=['POST'])
def generate_username():
    try:
        data = request.get_json()
        length = int(data.get('length', 8))
        include_numbers = data.get('include_numbers', True)
        include_special = data.get('include_special', False)
        prefix = data.get('prefix', '')
        
        if length < 3:
            return jsonify({
                'success': False,
                'error': 'Username length must be at least 3 characters.'
            }), 400
        
        # Build character set
        chars = string.ascii_lowercase
        if include_numbers:
            chars += string.digits
        if include_special:
            chars += '_-'
        
        # Generate username
        remaining_length = length - len(prefix)
        if remaining_length < 0:
            return jsonify({
                'success': False,
                'error': 'Prefix is longer than desired length.'
            }), 400
        
        username = prefix + ''.join(random.choice(chars) for _ in range(remaining_length))
        
        return jsonify({
            'success': True,
            'username': username,
            'length': len(username)
        })
    except (TypeError, ValueError) as e:
        return jsonify({
            'success': False,
            'error': 'Invalid input parameters.'
        }), 400

@app.route('/api/credentials_generator/generate_password', methods=['POST'])
def generate_password():
    try:
        data = request.get_json()
        length = int(data.get('length', 12))
        include_uppercase = data.get('include_uppercase', True)
        include_lowercase = data.get('include_lowercase', True)
        include_numbers = data.get('include_numbers', True)
        include_special = data.get('include_special', True)
        
        if length < 4:
            return jsonify({
                'success': False,
                'error': 'Password length must be at least 4 characters.'
            }), 400
        
        # Build character set
        chars = ''
        if include_uppercase:
            chars += string.ascii_uppercase
        if include_lowercase:
            chars += string.ascii_lowercase
        if include_numbers:
            chars += string.digits
        if include_special:
            chars += string.punctuation
        
        if not chars:
            return jsonify({
                'success': False,
                'error': 'At least one character type must be selected.'
            }), 400
        
        # Generate password
        password = ''.join(random.choice(chars) for _ in range(length))
        
        return jsonify({
            'success': True,
            'password': password,
            'length': len(password)
        })
    except (TypeError, ValueError) as e:
        return jsonify({
            'success': False,
            'error': 'Invalid input parameters.'
        }), 400

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'service': 'backend'})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
