import sys
import os

# Ensure both project root and apps/api are in sys.path
root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
api_dir = os.path.join(root_dir, "apps", "api")

if root_dir not in sys.path:
    sys.path.insert(0, root_dir)
if api_dir not in sys.path:
    sys.path.insert(0, api_dir)
