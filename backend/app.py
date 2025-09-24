from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # این خط برای رفع خطای CORS بسیار مهم است

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

# نقطه دسترسی (endpoint) برای اخبار
@app.route('/api/news')
def get_news():
    return jsonify(news_data)

# نقطه دسترسی (endpoint) برای کسب‌وکارها
@app.route('/api/businesses')
def get_businesses():
    return jsonify(businesses_data)

if __name__ == '__main__':
    app.run(debug=True)