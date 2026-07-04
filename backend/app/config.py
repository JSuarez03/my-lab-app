cat > app/config.py << 'EOF'
from pydantic_settings import BaseSettings
from pydantic import ConfigDict
import os

class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./lab.db"
    SECRET_KEY: str = "your-secret-key-here-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 480  # 8 horas

    model_config = ConfigDict(env_file=".env", env_file_encoding="utf-8")

settings = Settings()
EOF