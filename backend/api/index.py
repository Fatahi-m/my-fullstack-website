from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse
import json

# داده‌های نمونه اخبار
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

# داده‌های نمونه برای کسب‌وکارها
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

# تابع کمکی برای پیدا کردن آیتم بر اساس ID
def find_item_by_id(data_list, item_id):
    try:
        return next(item for item in data_list if str(item["id"]) == str(item_id))
    except StopIteration:
        return None

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        s = urlparse(self.path)
        path = s.path

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        # ⬅️ هدر CORS به صورت دستی
        self.send_header('Access-Control-Allow-Origin', '*') 
        self.end_headers()

        # مسیر جزئیات خبر
        if path.startswith('/api/news/'):
            parts = path.split('/')
            news_id = parts[-1] 
            item = find_item_by_id(news_data, news_id)
            self.wfile.write(json.dumps(item).encode('utf-8'))

        # مسیر جزئیات کسب‌وکار
        elif path.startswith('/api/businesses/'):
            parts = path.split('/')
            business_id = parts[-1]
            item = find_item_by_id(businesses_data, business_id)
            self.wfile.write(json.dumps(item).encode('utf-8'))

        # مسیر لیست اخبار
        elif path == '/api/news':
            self.wfile.write(json.dumps(news_data).encode('utf-8'))

        # مسیر لیست کسب‌وکارها
        elif path == '/api/businesses':
            self.wfile.write(json.dumps(businesses_data).encode('utf-8'))

        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"Not Found")