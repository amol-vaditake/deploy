# API DOCUMENTATION
# https://deploy-iwy1.onrender.com/ (Deployed Project Link)


## Users Routes 

##### /api/users/login (POST)
###### required fields --> name , email , password
###### validation --> email should be valid , password should be 8 character long , name should be 3 char long
###### res --> JWT access token will be given with 10 min expiry

##### /api/users/changePassword (POST)
###### required fields --> authorization bearer token and newPassword
###### res --> { massage: 'done' }

##### /api/users/logout (POST)
###### required fields --> authorization bearer token
###### res --> { massage: 'done' }


## Roles Routes

##### /api/roles/create (POST)
###### required fields --> authorization bearer token and role (e.g admin, manager)
###### res --> { massage: 'done' }


##### /api/roles/delete (POST)
###### required fields --> authorization bearer token and roleId (doc id of role)
###### res --> { massage: 'done' }

##### /api/roles/get (GET)
###### required fields --> authorization bearer token
###### res --> { massage: 'done' ,roles : [all roles of logged in user] }

##### /api/roles/getById (POST)
###### required fields --> authorization bearer token and roleId (doc id of role)
###### res --> { massage: 'done' ,role: doc }

## Posts Route

##### /api/posts/create (POST)
###### required fields --> authorization bearer token and title
###### res --> { massage: 'done' ,post : created doc}

##### /api/posts/update (POST)
###### required fields --> authorization bearer token , postId and title (new title for update)
###### res --> { massage: 'done' ,post : updated doc}
###### rules --> Admin can edit anybodys posts but user can only edit his/her created posts

##### /api/posts/delete (POST)
###### required fields --> authorization bearer token , postId
###### res --> { massage: 'done'}
###### rules --> Admin can delete anybodys posts but user can only delete his/her created posts

##### /api/posts/get (GET)
###### required fields --> authorization bearer token , page , postPerPage , filters , sort (all these fields are optional and default values are page: 1 , postPerPage: 10 , sort :{name:1} ) 
###### res --> { massage: 'done' , posts: [array of posts]}
###### rules --> filters and sort are directly applied on collection of mongo 

##### /api/posts/getById (POST)
###### required fields --> authorization bearer token , postId
###### res --> { massage: 'done', post: doc}


## Comments Route

##### /api/comments/create (POST)
###### required fields --> authorization bearer token and title
###### res --> { massage: 'done' ,comment : created doc}

##### /api/comments/update (POST)
######required fields --> authorization bearer token , commentId and title (new title for update)
###### res --> { massage: 'done' ,comment : updated doc}
###### rules --> Admin can edit anybodys comments but user can only edit his/her created comments

##### /api/comments/delete (POST)
###### required fields --> authorization bearer token , commentId
###### res --> { massage: 'done'}
###### rules --> Admin can delete anybodys comments but user can only delete his/her created comments

##### /api/comments/get (GET)
###### required fields --> authorization bearer token , page , commentPerPage , filters , sort (all these fields are optional and default values are page: 1 , commentPerPage: 10 , sort :{name:1} ) 
###### res --> { massage: 'done' , comments: [array of comments]}
###### rules --> filters and sort are directly applied on collection of mongo 

##### /api/comments/getById (POST)
###### required fields --> authorization bearer token , commentId
###### res --> { massage: 'done', comment: doc}

* Did not used any mongo indexes for query optimization 

