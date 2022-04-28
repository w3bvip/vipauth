## Guide And Rules

----------

### User And Auth

----------

 **UserClass:**  

   it's a helper class with an static userObject method that returns a user object from the request.  

  **Arguments:**

- request: The request object
- encrypt: a boolean indicating if the password should be encrypted

  **example:**
  
  `const user = await UserClass.user(req, true);`
  
- user object should always be fetched with the userClass helper
- try to avoid fetching user object directly from the request.

----------

### Bad practices and don'ts

----

try to avoid:

`const user = request.body.user
`

**never ever do this**:

`
user.company=req.body.company
`
