# build_files.sh Build instructions for Vercel
pip install -r requirements.txt
export PATH=$(pwd):$PATH
echo $PATH
echo $(ls)
sleep 30
python3.9 manage.py collectstatic