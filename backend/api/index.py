from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse
import json

# داده‌های نمونه (بدون تغییر)
news_data = [
    {
        "id": 1,
        "title": "افتتاح بزرگترین مرکز نوآوری در تهران",
        "description": "مرکز نوآوری تهران با هدف حمایت از استارتاپ‌ها و توسعه تکنولوژی افتتاح شد.",
        "imageUrl": "https://via.placeholder.com/300x200.png?text=اخبار+۱"
    },
    {
        "id": 2,
        "title": "وبینار رایگان بازاریابی دیجیتال",
        "description": "فرصتی برای یادگیری جدیدترین تکنیک‌های بازاریابی از متخصصان برجسته.",
        "imageUrl": "https://via.placeholder.com/300x200.png?text=اخبار+۲"
    },
    {
        "id": 3,
        "title": "رویداد استارتاپ ویکند",
        "description": "فرصتی برای تیم‌سازی و تبدیل ایده‌های نوآورانه به یک کسب‌وکار واقعی.",
        "imageUrl": "https://via.placeholder.com/300x200.png?text=اخبار+۳"
    }
]

businesses_data = [
    {
        "id": 1,
        "name": "کافی‌شاپ پاتوق",
        "category": "کافی‌شاپ و رستوران",
        "imageUrl": "https://via.placeholder.com/300x200.png?text=کسب‌وکار+۱"
    },
    {
        "id": 2,
        "name": "آکادمی کدنویسی",
        "category": "آموزش و مشاوره",
        "imageUrl": "https://via.placeholder.com/300x200.png?text=کسب‌وکار+۲"
    },
    {
        "id": 3,
        "name": "فروشگاه آنلاین مد روز",
        "category": "پوشاک و مد",
        "imageUrl": "https://via.placeholder.com/300x200.png?text=کسب‌وکار+۳"
    }
]

# ⬅️ تابع کمکی برای ارسال پاسخ JSON با هدر CORS
def send_json_response(self, data):
    self.send_response(200)
    # ⬅️ هدر اصلی CORS که اجازه دسترسی به همه دامنه‌ها را می‌دهد
    self.send_header('Access-Control-Allow-Origin', '*') 
    self.send_header('Content-type', 'application/json')
    self.end_headers()
    self.wfile.write(json.dumps(data).encode('utf-8'))
def find_news_by_id(news_id):
    """پیدا کردن خبر بر اساس ID در لیست داده‌های نمونه."""
    try:
        # جستجو در لیست news_data برای پیدا کردن آیتم با id مورد نظر
        return next(item for item in news_data if str(item["id"]) == str(news_id))
    except StopIteration:
        return None

def find_business_by_id(business_id):
    """پیدا کردن کسب‌وکار بر اساس ID در لیست داده‌های نمونه."""
    try:
        # جستجو در لیست businesses_data
        return next(item for item in businesses_data if str(item["id"]) == str(business_id))
    except StopIteration:
        return None

# ⬅️ هندلر اصلی Vercel
class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        s = urlparse(self.path)
        path = s.path

        if path.startswith('/api/news/'):
            parts = path.split('/')
            news_id = parts[-1] 
            item = find_news_by_id(news_id)
            if item:
                send_json_response(self, item)
            else:
                self.send_response(404)
                self.end_headers()
                self.wfile.write(b"News Item Not Found")

        elif path.startswith('/api/businesses/'):
            parts = path.split('/')
            business_id = parts[-1]
            item = find_business_by_id(business_id)
            if item:
                send_json_response(self, item)
            else:
                self.send_response(404)
                self.end_headers()
                self.wfile.write(b"Business Not Found")

        if path == '/api/news':
            send_json_response(self, news_data)
        elif path == '/api/businesses':
            send_json_response(self, businesses_data)
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"Not Found")