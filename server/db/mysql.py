import pymysql

class Testdb:
    def __init__(self):
        self.db = pymysql.connect(host='localhost',
                                port=3306, user='*', passwd='*',
                                db='*', charset='utf8')

    #passwd는 일단 비공개를 위해 가렸습니다...

    def select_all(self):
        cursor = self.db.cursor()
        sql = 'select * from TEST.test_table'
        cursor.execute(sql)
        result = cursor.fetchall()
        return result