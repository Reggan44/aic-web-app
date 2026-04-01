import sys
import subprocess
try:
    import pypdf
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pypdf", "--break-system-packages"])
    import pypdf

# Use WSL path first, fallback to Windows path
try:
    reader = pypdf.PdfReader("/mnt/c/Users/royal/Downloads/AIC HAPPY VALLEY VISION DOCUMENT.pdf")
except FileNotFoundError:
    reader = pypdf.PdfReader("C:\\Users\\royal\\Downloads\\AIC HAPPY VALLEY VISION DOCUMENT.pdf")

text = ""
for page in reader.pages:
    text += page.extract_text() + "\n"

with open("church_details.txt", "w", encoding="utf-8") as f:
    f.write(text)
print("Successfully extracted church details.")
