# build_files.sh Build instructions for Vercel
pip install -r requirements.txt
export PATH=$(pwd):$PATH
python3.9 manage.py collectstatic