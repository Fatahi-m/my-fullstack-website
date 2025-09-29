from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse
import json

# =========================================================================
# 1. داده‌های سراسری (شبیه‌سازی دیتابیس)
# =========================================================================

# لیست ساده برای شبیه‌سازی پایگاه داده کاربران (فقط در طول اجرای سرور ذخیره می‌شود)
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

# تابع کمکی برای ارسال پاسخ JSON با هدر CORS
def send_json_response(self, data, status_code=200):
    self.send_response(status_code)
    self.send_header('Access-Control-Allow-Origin', '*') 
    self.send_header('Content-type', 'application/json')
    self.end_headers()
    self.wfile.write(json.dumps(data).encode('utf-8'))


# =========================================================================
# 2. هندلر اصلی (GET، POST و OPTIONS)
# =========================================================================

class handler(BaseHTTPRequestHandler):
    
    # مدیریت درخواست‌های دریافت داده (GET)
    def do_GET(self):
        s = urlparse(self.path)
        path = s.path

        # مسیر جزئیات خبر
        if path.startswith('/api/news/'):
            parts = path.split('/')
            news_id = parts[-1] 
            item = find_item_by_id(news_data, news_id)
            send_json_response(self, item)

        # مسیر جزئیات کسب‌وکار
        elif path.startswith('/api/businesses/'):
            parts = path.split('/')
            business_id = parts[-1]
            item = find_item_by_id(businesses_data, business_id)
            send_json_response(self, item)

        # مسیر لیست اخبار
        elif path == '/api/news':
            send_json_response(self, news_data)

        # مسیر لیست کسب‌وکارها
        elif path == '/api/businesses':
            send_json_response(self, businesses_data)

        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"Not Found")


    # مدیریت درخواست‌های ثبت‌نام و ورود (POST)
    def do_POST(self):
        s = urlparse(self.path)
        path = s.path
        
        try:
            # 1. خواندن داده‌های ارسالی از فرانت‌اند
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
            user_exists = any(u['email'] == data['email'] for u in users)
            
            if user_exists:
                send_json_response(self, {'message': 'User already exists'}, status_code=409) # 409 Conflict
                return
            
            new_user = {'id': len(users) + 1, 'username': data['username'], 'email': data['email'], 'password': data['password']}
            users.append(new_user)
            send_json_response(self, {'message': 'User created successfully', 'user_id': new_user['id']}, status_code=201) # 201 Created

        # 3. مدیریت مسیر ورود
        elif path == '/api/auth/login':
            user = next((u for u in users if u['email'] == data['email'] and u['password'] == data['password']), None)
            
            if user:
                # ⬅️ پاسخ موفقیت‌آمیز: اضافه کردن username به پاسخ
                send_json_response(self, {'message': 'Login successful', 'user_id': user['id'], 'username': user['username']}) 
            else:
                # پاسخ ناموفق
                send_json_response(self, {'message': 'Invalid credentials'}, status_code=401) # 401 Unauthorized
        
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"Not Found")


    # ⬅️ مدیریت درخواست‌های CORS Preflight (OPTIONS) - بدون تغییر نسبت به قبل
    def do_OPTIONS(self):
        self.send_response(200) 
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()