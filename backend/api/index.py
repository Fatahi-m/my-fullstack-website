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

# ⬅️ هندلر اصلی Vercel
class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        s = urlparse(self.path)
        path = s.path

        if path == '/api/news':
            send_json_response(self, news_data)
        elif path == '/api/businesses':
            send_json_response(self, businesses_data)
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"Not Found")