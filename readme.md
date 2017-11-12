
========================================
========================================
This is to build a chatroom

MongoDB + Node.js + Express
This part is just a RestFUL API Server
The other part is AngularJS



=======================================
DB

DBMS: MongoDB

DB:chatroom


--------------------------------------
Collection Design

users(config file alias:c1)
groups(config file alias:c2)
gprecords(config file alias:c3)


--------------------------------------
How to Depoly?
1 install MongoDB on localhost
2 install Nodejs 
3 depoly this application folder and run "npm install" to install the node_modules Lib
4 Run the dbCreated.js, which add some data into the DB
5 node ./bin/www    [it is set to listen on http 80 port, not nodejs default 3000 port]

-------------------------------------
How to Test?
plese use the Mocha


