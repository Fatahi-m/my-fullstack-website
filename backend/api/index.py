from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse
import json
import os # ⬅️ برای خواندن متغیر محیطی
from pymongo import MongoClient # ⬅️ برای اتصال به MongoDB
from bson.objectid import ObjectId # ⬅️ برای تبدیل ObjectId به رشته

# =========================================================================
# 1. اتصال به دیتابیس و داده‌های سراسری
# =========================================================================

try:
    # ⬅️ ⬅️ ⬅️ اتصال به MongoDB از طریق متغیر محیطی Vercel
    client = MongoClient(os.environ.get("MONGODB_URI"))
    db = client.user_db  # نام دیتابیس
    users_collection = db.users # کالکشن (جدول) کاربران
    DB_CONNECTED = True
except Exception as e:
    print(f"ERROR: Could not connect to MongoDB: {e}")
    DB_CONNECTED = False
    # در صورت شکست اتصال، از یک لیست موقت برای جلوگیری از کرش استفاده می‌کنیم
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

# تابع کمکی برای پیدا کردن آیتم بر اساس ID (بدون تغییر)
def find_item_by_id(data_list, item_id):
    # ... (کد قبلی) ...
    try:
        return next(item for item in data_list if str(item["id"]) == str(item_id))
    except StopIteration:
        return None

# تابع کمکی برای ارسال پاسخ JSON (بدون تغییر)
def send_json_response(self, data, status_code=200):
    # ⬅️ تبدیل ObjectId برای سازگاری با JSON
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
    
    # ... (do_GET بدون تغییر) ...

    # مدیریت درخواست‌های ثبت‌نام و ورود (POST)
    def do_POST(self):
        s = urlparse(self.path)
        path = s.path
        
        # ⬅️ مدیریت وضعیت قطعی دیتابیس
        if not DB_CONNECTED and path.startswith('/api/auth'):
             send_json_response(self, {'message': 'Database connection failed'}, status_code=503)
             return
        
        # ... (خواندن داده‌ها از درخواست و try/except) ...
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
        except Exception:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(b"Invalid JSON")
            return

        # 2. مدیریت مسیر ثبت‌نام (استفاده از MongoDB)
        if path == '/api/auth/signup':
            # بررسی وجود کاربر در MongoDB
            user_exists = users_collection.find_one({"email": data['email']})
            
            if user_exists:
                send_json_response(self, {'message': 'User already exists'}, status_code=409) 
                return
            
            # ثبت کاربر جدید در MongoDB
            new_user = {'username': data['username'], 'email': data['email'], 'password': data['password']}
            result = users_collection.insert_one(new_user)
            
            # پاسخ موفقیت‌آمیز با MongoDB ObjectId
            send_json_response(self, {'message': 'User created successfully', 'user_id': str(result.inserted_id)}, status_code=201)

        # 3. مدیریت مسیر ورود (استفاده از MongoDB)
        elif path == '/api/auth/login':
            # جستجو در MongoDB
            user = users_collection.find_one({"email": data['email'], "password": data['password']})
            
            if user:
                # پاسخ موفقیت‌آمیز: اضافه کردن username و تبدیل ObjectId به رشته
                send_json_response(self, user) # send_json_response ObjectId را تبدیل می‌کند
            else:
                send_json_response(self, {'message': 'Invalid credentials'}, status_code=401) 
        
        # 4. مدیریت مسیر خروج و Not Found (بدون تغییر)
        # ... (کد قبلی) ...


    # ⬅️ مدیریت درخواست‌های CORS Preflight (OPTIONS)
    def do_OPTIONS(self):
        self.send_response(200) 
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()