from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse
import json
import os 
from pymongo import MongoClient 
from bson.objectid import ObjectId 

# =========================================================================
# 1. اتصال به دیتابیس و داده‌های سراسری
# =========================================================================

try:
    # اتصال به MongoDB از طریق متغیر محیطی Vercel
    client = MongoClient(os.environ.get("MONGODB_URI"))
    db = client.user_db  
    users_collection = db.users 
    DB_CONNECTED = True
except Exception as e:
    DB_CONNECTED = False
    users = [] 

# داده‌های نمونه اخبار
news_data = [
    {"id": 1, "title": "افتتاح بزرگترین مرکز نوآوری در تهران", "description": "مرکز نوآوری تهران با هدف حمایت از استارتاپ‌ها و توسعه تکنولوژی افتتاح شد.", "imageUrl": "https://via.placeholder.com/300x200.png?text=اخبار+۱"},
    {"id": 2, "title": "وبینار رایگان بازاریابی دیجیتال", "description": "فرصتی برای یادگیری جدیدترین تکنیک‌های بازاریابی از متخصصان برجسته.", "imageUrl": "https://via.placeholder.com/300x200.png?text=اخبار+۲"},
    {"id": 3, "title": "رویداد استارتاپ ویکند", "description": "فرصتی برای تیم‌سازی و تبدیل ایده‌های نوآورانه به یک کسب‌وکار واقعی.", "imageUrl": "https://via.placeholder.com/300x200.png?text=اخبار+۳"}
]

# داده‌های نمونه برای کسب‌وکارها
businesses_data = [
    {"id": 1, "name": "کافی‌شاپ پاتوق", "category": "کافی‌شاپ و رستوران", "imageUrl": "https://via.placeholder.com/300x200.png?text=کسب‌وکار+۱"},
    {"id": 2, "name": "آکادمی کدنویسی", "category": "آموزش و مشاوره", "imageUrl": "https://via.placeholder.com/300x200.png?text=کسب‌وکار+۲"},
    {"id": 3, "name": "فروشگاه آنلاین مد روز", "category": "پوشاک و مد", "imageUrl": "https://via.placeholder.com/300x200.png?text=کسب‌وکار+۳"}
]

# تابع کمکی برای پیدا کردن آیتم بر اساس ID
def find_item_by_id(data_list, item_id):
    try:
        return next(item for item in data_list if str(item["id"]) == str(item_id))
    except StopIteration:
        return None

# تابع کمکی برای ارسال پاسخ JSON
def send_json_response(self, data, status_code=200):
    if data and isinstance(data, dict) and '_id' in data:
        data['user_id'] = str(data.pop('_id')) 
    
    self.send_response(status_code)
    self.send_header('Access-Control-Allow-Origin', '*') 
    self.send_header('Content-type', 'application/json')
    self.end_headers()
    self.wfile.write(json.dumps(data).encode('utf-8'))


# =========================================================================
# 2. هندلر اصلی (GET، POST و OPTIONS)
# =========================================================================

class handler(BaseHTTPRequestHandler):
    
    # ⬅️ ⬅️ ⬅️ مدیریت درخواست‌های دریافت داده (GET) - کد صحیح
    def do_GET(self):
        s = urlparse(self.path)
        path = s.path

        # مسیرهای لیست کامل
        if path == '/api/news':
            send_json_response(self, news_data)
            return

        elif path == '/api/businesses':
            send_json_response(self, businesses_data)
            return
            
        # مسیر جزئیات خبر
        elif path.startswith('/api/news/'):
            parts = path.split('/')
            news_id = parts[-1] 
            item = find_item_by_id(news_data, news_id)
            send_json_response(self, item)
            return

        # مسیر جزئیات کسب‌وکار
        elif path.startswith('/api/businesses/'):
            parts = path.split('/')
            business_id = parts[-1]
            item = find_item_by_id(businesses_data, business_id)
            send_json_response(self, item)
            return
        
        # ⬅️ مدیریت مسیر خروج (که در GET نباید اجرا شود اما برای تکمیل کد می‌گذاریم)
        elif path == '/api/auth/logout':
            self.send_response(200) # پاسخ موفقیت‌آمیز
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'message': 'Logout endpoint active'}).encode('utf-8'))
            return
        
        # مدیریت 404
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"Not Found")


    # مدیریت درخواست‌های ثبت‌نام و ورود (POST) - (بدون تغییر)
    def do_POST(self):
        s = urlparse(self.path)
        path = s.path
        
        # ⬅️ مدیریت وضعیت قطعی دیتابیس (برای POST)
        if not DB_CONNECTED and path.startswith('/api/auth'):
             send_json_response(self, {'message': 'Database connection failed'}, status_code=503)
             return
             
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
        except Exception:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(b"Invalid JSON")
            return

        # 2. مدیریت مسیر ثبت‌نام
        if path == '/api/auth/signup':
            user_exists = users_collection.find_one({"email": data['email']})
            if user_exists:
                send_json_response(self, {'message': 'User already exists'}, status_code=409) 
                return
            new_user = {'username': data['username'], 'email': data['email'], 'password': data['password']}
            result = users_collection.insert_one(new_user)
            send_json_response(self, {'message': 'User created successfully', 'user_id': str(result.inserted_id)}, status_code=201) 

        # 3. مدیریت مسیر ورود
        elif path == '/api/auth/login':
            user = users_collection.find_one({"email": data['email'], "password": data['password']})
            if user:
                send_json_response(self, user)
            else:
                send_json_response(self, {'message': 'Invalid credentials'}, status_code=401) 
        
        elif path == '/api/auth/logout':
            send_json_response(self, {'message': 'Logout successful'})

        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"Not Found")


    # مدیریت درخواست‌های CORS Preflight (OPTIONS)
    def do_OPTIONS(self):
        self.send_response(200) 
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()