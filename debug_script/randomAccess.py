#!/usr/bin/env

import requests
from numpy.random import *
from numpy import *

TERGET_URL = 'http://localhost:9000'
URL_PATH = [
    '/',
    '/hoge.html',
    '/fuga.html',
    '/piyo.html',
    '/file.html?path=../../../../../../etc/password',
]
USER_AGENT = [
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:61.0) Gecko/20100101 Firefox/61.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1.2 Safari/605.1.15',
    'python-requests/2.19.1',
]
MATHOD = [
    'GET',
    'POST',
]
for _ in range(randint(10)):
    s = requests.Session()
    headers = {
        'User-Agent': random.choice(USER_AGENT),
    }
    for _ in range(randint(10)):
        if(random.choice(MATHOD) == 'GET'):
            s.get(TERGET_URL + random.choice(URL_PATH),headers=headers)
        else:
            s.post(TERGET_URL + random.choice(URL_PATH),headers=headers)
