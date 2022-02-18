# Project Blog

<hr>
<ul>
    <li><a href="#getStarted">Get started</a></li>
    <li><a href="#">Installation</a></li>
    <li><a href="#">Technologies</a></li>    
    <li><a href="#">Resourses</a></li>
    <li><a href="#">License</a></li>
    <li><a href="#">Author</a></li>
    
</ul>

<hr>

<ul>
  
<h3>Get started</h3>
<hr>
<li id="getStarted">

<strong>Install nodejs:</strong>

```
$ sudo apt-get update
$ sudo apt-get install nodejs
$ nodejs -v
  v10.19.0
```

<strong>Install Mariadb 10.3.32:</strong>

```
$ sudo apt-get update
$ sudo apt install mariadb-server

CREATE NEW USER:

$ sudo mariadb

Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 60
Server version: 10.3.32-MariaDB-0ubuntu0.20.04.1 Ubuntu 20.04

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]> GRANT ALL ON *.* TO 'admin'@'localhost' IDENTIFIED BY 'admin' WITH GRANT OPTION;

MariaDB [(none)]> FLUSH PRIVEILEGES;

MariaDB [(none)]> SELECT VERSION();
+----------------------------------+
| VERSION()                        |
+----------------------------------+
| 10.3.32-MariaDB-0ubuntu0.20.04.1 |
+----------------------------------+
1 row in set (0.000 sec)
```

<strong>Install packages:</strong>

```
$ npm install
$ npm install express nodemon ejs
```
