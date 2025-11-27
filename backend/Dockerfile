# Gunakan Python versi yang sama dengan Colab
FROM python:3.10-slim

# Set folder kerja
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy semua file (termasuk model)
COPY . .

# Railway menyediakan variabel environment $PORT. 
# Kita gunakan itu, atau default ke 8000 jika tidak ada.
CMD uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}