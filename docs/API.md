## Classes

<dl>
<dt><a href="#AuthManager">AuthManager</a></dt>
<dd></dd>
<dt><a href="#ContactManger">ContactManger</a></dt>
<dd><p>Contact Manager</p>
</dd>
<dt><a href="#ProfileManager">ProfileManager</a></dt>
<dd></dd>
<dt><a href="#SearchManager">SearchManager</a></dt>
<dd></dd>
<dt><a href="#SpamManager">SpamManager</a></dt>
<dd></dd>
<dt><a href="#TokenManager">TokenManager</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#passportStrategy - configure jwt authentication using passport">passportStrategy - configure jwt authentication using passport(passport, usageName, KEY)</a></dt>
<dd></dd>
<dt><a href="#passportConfig - jwt strategies for access and refresh tokens with passport.">passportConfig - jwt strategies for access and refresh tokens with passport.(passport)</a></dt>
<dd></dd>
<dt><a href="#validateRequest">validateRequest(req, res, next)</a></dt>
<dd><p>Validate that the request body is not empty.</p>
</dd>
<dt><a href="#validatePhone">validatePhone(req, res, next)</a></dt>
<dd><p>Validate the phone number in the request body.</p>
</dd>
<dt><a href="#validateName">validateName(req, res, next)</a></dt>
<dd><p>Validate the name in the request body.</p>
</dd>
<dt><a href="#validateEmail">validateEmail(req, res, next)</a></dt>
<dd><p>Validate the email in the request body.</p>
</dd>
<dt><a href="#validateTempMail">validateTempMail(req, res, next)</a></dt>
<dd><p>Validate the email domain in the request body against a list of allowed providers.</p>
</dd>
<dt><a href="#validatePassword">validatePassword(req, res, next)</a></dt>
<dd><p>Validate the password in the request body.</p>
</dd>
<dt><a href="#validateAuthToken">validateAuthToken(req, res, next)</a></dt>
<dd><p>Validate the authorization token in the request headers.</p>
</dd>
<dt><a href="#findUserByPhoneNumber">findUserByPhoneNumber(phone)</a> ⇒ <code>undefined</code> | <code>boolean</code> | <code>Object</code></dt>
<dd><p>Find the user with phone number</p>
</dd>
<dt><a href="#createUser">createUser(name, phone, password, email)</a> ⇒ <code>undefined</code> | <code>boolean</code> | <code>Object</code></dt>
<dd><p>Create user with name, phone and password</p>
</dd>
<dt><a href="#hashedPassword">hashedPassword(password)</a> ⇒ <code>string</code></dt>
<dd><p>salt and hash the password</p>
</dd>
<dt><a href="#verifyPassword">verifyPassword(enteredPassword, storedPassword)</a> ⇒ <code>boolean</code></dt>
<dd><p>Verify salted and hashed the password</p>
</dd>
<dt><a href="#createUniqueId">createUniqueId(type)</a> ⇒ <code>string</code></dt>
<dd><p>Create unique id for different purpose</p>
</dd>
<dt><a href="#validateUserId">validateUserId(id)</a> ⇒ <code>boolean</code></dt>
<dd><p>validates unique or user id format</p>
</dd>
<dt><a href="#findContactByNumber">findContactByNumber(phone, userId)</a> ⇒ <code>Object</code> | <code>boolean</code> | <code>undefined</code></dt>
<dd><p>Find contacts by phone number.</p>
</dd>
<dt><a href="#findContactById">findContactById(userId, contactId)</a> ⇒ <code>Object</code> | <code>boolean</code> | <code>undefined</code></dt>
<dd><p>Find contacts by contact id.</p>
</dd>
<dt><a href="#retrieveAllContacts">retrieveAllContacts(userId)</a> ⇒ <code>Array</code> | <code>boolean</code> | <code>undefined</code></dt>
<dd><p>Find all contacts by user id.</p>
</dd>
<dt><a href="#addContact">addContact(name, phone, userId, userId_ref)</a> ⇒ <code>Object</code> | <code>null</code> | <code>undefined</code></dt>
<dd><p>add new contact with name, phone, userId(userId), user referrance id (userId_ref).</p>
</dd>
<dt><a href="#deleteContact">deleteContact(userId, contactId)</a> ⇒ <code>number</code> | <code>boolean</code> | <code>undefined</code></dt>
<dd><p>Find contacts by contact id.</p>
</dd>
<dt><a href="#updateContact">updateContact(userId, contactId, name, phone)</a> ⇒ <code>number</code> | <code>boolean</code> | <code>undefined</code></dt>
<dd><p>Update the contact by userId and contactId</p>
</dd>
<dt><a href="#updateEmail">updateEmail(email, userId)</a> ⇒ <code>Promise.&lt;(Object|boolean|undefined)&gt;</code></dt>
<dd><p>Update the email address of the user with the given userId.</p>
</dd>
<dt><a href="#updatePhone">updatePhone(phone, userId)</a> ⇒ <code>Promise.&lt;(Object|boolean|undefined)&gt;</code></dt>
<dd><p>Update the phone number of the user with the given userId.</p>
</dd>
<dt><a href="#updateName">updateName(name, userId)</a> ⇒ <code>Promise.&lt;(Object|boolean|undefined)&gt;</code></dt>
<dd><p>Update the name of the user with the given userId.</p>
</dd>
<dt><a href="#updatePassword">updatePassword(password, userId)</a> ⇒ <code>Promise.&lt;(Object|boolean|undefined)&gt;</code></dt>
<dd><p>Update the password of the user with the given userId.</p>
</dd>
<dt><a href="#SearchByQuery">SearchByQuery(searchQuery, searchQueryType)</a> ⇒ <code>Promise.&lt;(Array|undefined)&gt;</code></dt>
<dd><p>Search for users or contacts based on a query and query type. If no results are found in users, it searches in contacts. Additionally, it fetches the spam count for each found item.</p>
</dd>
<dt><a href="#findSpamNumber">findSpamNumber(phone, spammedById)</a> ⇒ <code>Promise.&lt;(Object|null|undefined)&gt;</code></dt>
<dd><p>Find a spam record for a specific phone number and user.</p>
</dd>
<dt><a href="#markNumberSpam">markNumberSpam(id, userId, phone)</a> ⇒ <code>Promise.&lt;(Object|null|undefined)&gt;</code></dt>
<dd><p>Mark a specific phone number as spam by a user.</p>
</dd>
<dt><a href="#findRefreshToken">findRefreshToken(refreshToken)</a> ⇒ <code>object</code> | <code>boolean</code> | <code>undefined</code></dt>
<dd><p>Find an existing refresh token by its value.</p>
</dd>
<dt><a href="#findRefreshTokenById">findRefreshTokenById(userId)</a> ⇒ <code>object</code> | <code>boolean</code> | <code>undefined</code></dt>
<dd><p>Find an existing refresh token by user ID.</p>
</dd>
<dt><a href="#updateRefreshToken">updateRefreshToken(refreshToken, userId)</a> ⇒ <code>number</code> | <code>null</code> | <code>undefined</code></dt>
<dd><p>Update the status of a refresh token.</p>
</dd>
<dt><a href="#deleteExistingRefreshTokens">deleteExistingRefreshTokens(userId)</a> ⇒ <code>number</code> | <code>null</code> | <code>undefined</code></dt>
<dd><p>Delete all existing refresh tokens associated with a user.</p>
</dd>
<dt><a href="#decodeToken">decodeToken(token)</a> ⇒ <code>object</code> | <code>null</code> | <code>undefined</code></dt>
<dd><p>Decode a JWT token to retrieve its payload.</p>
</dd>
<dt><a href="#storeRefreshToken">storeRefreshToken(refreshToken, userId, userId_ref, expiresAt)</a> ⇒ <code>object</code> | <code>null</code> | <code>undefined</code></dt>
<dd><p>Store a new refresh token in the database.</p>
</dd>
</dl>

<a name="AuthManager"></a>

## AuthManager
**Kind**: global class  
<a name="new_AuthManager_new"></a>

### new AuthManager()
manages authentication

<a name="ContactManger"></a>

## ContactManger
Contact Manager

**Kind**: global class  
<a name="new_ContactManger_new"></a>

### new ContactManger()
Manage contacts

<a name="ProfileManager"></a>

## ProfileManager
**Kind**: global class  
<a name="new_ProfileManager_new"></a>

### new ProfileManager()
Class responsible for managing user profile updates such as email, phone, name, and password.

<a name="SearchManager"></a>

## SearchManager
**Kind**: global class  
<a name="new_SearchManager_new"></a>

### new SearchManager()
Class responsible for managing search operations for users and contacts.

<a name="SpamManager"></a>

## SpamManager
**Kind**: global class  
<a name="new_SpamManager_new"></a>

### new SpamManager()
Class responsible for managing spam-related operations such as finding and marking phone numbers as spam.

<a name="TokenManager"></a>

## TokenManager
**Kind**: global class  
<a name="new_TokenManager_new"></a>

### new TokenManager()
Class responsible for managing JWT tokens such as refresh tokens.

<a name="passportStrategy - configure jwt authentication using passport"></a>

## passportStrategy - configure jwt authentication using passport(passport, usageName, KEY)
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| passport | <code>Object</code> | passport instance |
| usageName | <code>string</code> | name of the strategy (ex: jwt-access) |
| KEY | <code>string</code> | public key to verify jwt |

<a name="passportConfig - jwt strategies for access and refresh tokens with passport."></a>

## passportConfig - jwt strategies for access and refresh tokens with passport.(passport)
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| passport | <code>Object</code> | passport instance |

<a name="validateRequest"></a>

## validateRequest(req, res, next)
Validate that the request body is not empty.

**Kind**: global function  
**Throws**:

- <code>CustomErrorHandler</code> If the request body is empty.


| Param | Type | Description |
| --- | --- | --- |
| req | <code>Request</code> | The request object. |
| res | <code>Response</code> | The response object. |
| next | <code>function</code> | The next middleware function. |

<a name="validatePhone"></a>

## validatePhone(req, res, next)
Validate the phone number in the request body.

**Kind**: global function  
**Throws**:

- <code>CustomErrorHandler</code> If the phone number is invalid.


| Param | Type | Description |
| --- | --- | --- |
| req | <code>Request</code> | The request object. |
| res | <code>Response</code> | The response object. |
| next | <code>function</code> | The next middleware function. |

<a name="validateName"></a>

## validateName(req, res, next)
Validate the name in the request body.

**Kind**: global function  
**Throws**:

- <code>CustomErrorHandler</code> If the name is invalid.


| Param | Type | Description |
| --- | --- | --- |
| req | <code>Request</code> | The request object. |
| res | <code>Response</code> | The response object. |
| next | <code>function</code> | The next middleware function. |

<a name="validateEmail"></a>

## validateEmail(req, res, next)
Validate the email in the request body.

**Kind**: global function  
**Throws**:

- <code>CustomErrorHandler</code> If the email is invalid.


| Param | Type | Description |
| --- | --- | --- |
| req | <code>Request</code> | The request object. |
| res | <code>Response</code> | The response object. |
| next | <code>function</code> | The next middleware function. |

<a name="validateTempMail"></a>

## validateTempMail(req, res, next)
Validate the email domain in the request body against a list of allowed providers.

**Kind**: global function  
**Throws**:

- <code>CustomErrorHandler</code> If the email domain is invalid.


| Param | Type | Description |
| --- | --- | --- |
| req | <code>Request</code> | The request object. |
| res | <code>Response</code> | The response object. |
| next | <code>function</code> | The next middleware function. |

<a name="validatePassword"></a>

## validatePassword(req, res, next)
Validate the password in the request body.

**Kind**: global function  
**Throws**:

- <code>CustomErrorHandler</code> If the password is invalid.


| Param | Type | Description |
| --- | --- | --- |
| req | <code>Request</code> | The request object. |
| res | <code>Response</code> | The response object. |
| next | <code>function</code> | The next middleware function. |

<a name="validateAuthToken"></a>

## validateAuthToken(req, res, next)
Validate the authorization token in the request headers.

**Kind**: global function  
**Throws**:

- <code>CustomErrorHandler</code> If the authorization token is invalid.


| Param | Type | Description |
| --- | --- | --- |
| req | <code>Request</code> | The request object. |
| res | <code>Response</code> | The response object. |
| next | <code>function</code> | The next middleware function. |

<a name="findUserByPhoneNumber"></a>

## findUserByPhoneNumber(phone) ⇒ <code>undefined</code> \| <code>boolean</code> \| <code>Object</code>
Find the user with phone number

**Kind**: global function  
**Returns**: <code>undefined</code> \| <code>boolean</code> \| <code>Object</code> - - undefined if phone not provided, false if user not found and user object if found  
**Throws**:

- <code>Error</code> trows error in case of any failure


| Param | Type |
| --- | --- |
| phone | <code>string</code> | 

<a name="createUser"></a>

## createUser(name, phone, password, email) ⇒ <code>undefined</code> \| <code>boolean</code> \| <code>Object</code>
Create user with name, phone and password

**Kind**: global function  
**Returns**: <code>undefined</code> \| <code>boolean</code> \| <code>Object</code> - - undefined if name,phone and password not provided, and if user created, returns user object  
**Throws**:

- <code>Error</code> trows error in case of any failure


| Param | Type |
| --- | --- |
| name | <code>string</code> | 
| phone | <code>string</code> | 
| password | <code>string</code> | 
| email | <code>string</code> | 

<a name="hashedPassword"></a>

## hashedPassword(password) ⇒ <code>string</code>
salt and hash the password

**Kind**: global function  
**Returns**: <code>string</code> - salted and hashed password  
**Throws**:

- <code>Error</code> trows error in case of any failure


| Param | Type |
| --- | --- |
| password | <code>string</code> | 

<a name="verifyPassword"></a>

## verifyPassword(enteredPassword, storedPassword) ⇒ <code>boolean</code>
Verify salted and hashed the password

**Kind**: global function  
**Returns**: <code>boolean</code> - True if password is correct  
**Throws**:

- <code>Error</code> trows error in case of any failure


| Param | Type | Description |
| --- | --- | --- |
| enteredPassword | <code>string</code> | entered password |
| storedPassword | <code>string</code> | stored password |

<a name="createUniqueId"></a>

## createUniqueId(type) ⇒ <code>string</code>
Create unique id for different purpose

**Kind**: global function  
**Returns**: <code>string</code> - unique id  
**Throws**:

- <code>Error</code> trows error in case of any failure


| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | unique id type |

<a name="validateUserId"></a>

## validateUserId(id) ⇒ <code>boolean</code>
validates unique or user id format

**Kind**: global function  
**Returns**: <code>boolean</code> - True if id format is correct  
**Throws**:

- <code>Error</code> trows error in case of any failure


| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | unique id |

<a name="findContactByNumber"></a>

## findContactByNumber(phone, userId) ⇒ <code>Object</code> \| <code>boolean</code> \| <code>undefined</code>
Find contacts by phone number.

**Kind**: global function  
**Returns**: <code>Object</code> \| <code>boolean</code> \| <code>undefined</code> - If phone not provided returns undefined, if contact not found return false, if contact found return contact.  
**Throws**:

- <code>Error</code> if something went wrong during the search.


| Param | Type | Description |
| --- | --- | --- |
| phone | <code>string</code> | phone number. |
| userId | <code>string</code> | user Id of the user. |

<a name="findContactById"></a>

## findContactById(userId, contactId) ⇒ <code>Object</code> \| <code>boolean</code> \| <code>undefined</code>
Find contacts by contact id.

**Kind**: global function  
**Returns**: <code>Object</code> \| <code>boolean</code> \| <code>undefined</code> - If user id or contact id not provided returns undefined, if contact not found return false, if contact found return contact.  
**Throws**:

- <code>Error</code> if something went wrong during the search.


| Param | Type | Description |
| --- | --- | --- |
| userId | <code>string</code> | user Id of the user. |
| contactId | <code>string</code> | contact id. |

<a name="retrieveAllContacts"></a>

## retrieveAllContacts(userId) ⇒ <code>Array</code> \| <code>boolean</code> \| <code>undefined</code>
Find all contacts by user id.

**Kind**: global function  
**Returns**: <code>Array</code> \| <code>boolean</code> \| <code>undefined</code> - If user id not provided returns undefined, if contact not found return false, if contact found return contact array.  
**Throws**:

- <code>Error</code> if something went wrong during the search.


| Param | Type | Description |
| --- | --- | --- |
| userId | <code>string</code> | user Id of the user. |

<a name="addContact"></a>

## addContact(name, phone, userId, userId_ref) ⇒ <code>Object</code> \| <code>null</code> \| <code>undefined</code>
add new contact with name, phone, userId(userId), user referrance id (userId_ref).

**Kind**: global function  
**Returns**: <code>Object</code> \| <code>null</code> \| <code>undefined</code> - If name or phone or userId or userId_ref not provided returns undefined, if contact add process failed returns null.  
**Throws**:

- <code>Error</code> if something went wrong during addition of contact.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | contact name. |
| phone | <code>string</code> | contact phone. |
| userId | <code>string</code> | user Id of the user (user.userId). |
| userId_ref | <code>number</code> | user referrance id (user.id). |

<a name="deleteContact"></a>

## deleteContact(userId, contactId) ⇒ <code>number</code> \| <code>boolean</code> \| <code>undefined</code>
Find contacts by contact id.

**Kind**: global function  
**Returns**: <code>number</code> \| <code>boolean</code> \| <code>undefined</code> - If user id or contact id not provided returns undefined, if contact delete process failed returns null and if contact deleted return number of rows.  
**Throws**:

- <code>Error</code> if something went wrong during the delete process.


| Param | Type | Description |
| --- | --- | --- |
| userId | <code>string</code> | user Id of the user. |
| contactId | <code>string</code> | contact id. |

<a name="updateContact"></a>

## updateContact(userId, contactId, name, phone) ⇒ <code>number</code> \| <code>boolean</code> \| <code>undefined</code>
Update the contact by userId and contactId

**Kind**: global function  
**Returns**: <code>number</code> \| <code>boolean</code> \| <code>undefined</code> - If user id or contact id not provided returns undefined, if contact update process failed returns null and if contact updated return number of rows.  
**Throws**:

- <code>Error</code> if something went wrong during the update process.


| Param | Type | Description |
| --- | --- | --- |
| userId | <code>string</code> | user Id of the user. |
| contactId | <code>string</code> | contact id. |
| name | <code>string</code> | new name. |
| phone | <code>string</code> | new phone. |

<a name="updateEmail"></a>

## updateEmail(email, userId) ⇒ <code>Promise.&lt;(Object\|boolean\|undefined)&gt;</code>
Update the email address of the user with the given userId.

**Kind**: global function  
**Returns**: <code>Promise.&lt;(Object\|boolean\|undefined)&gt;</code> - Returns the result object, false if update fails, or undefined if parameters are invalid.  
**Throws**:

- <code>Error</code> In case of any error during email update process.


| Param | Type | Description |
| --- | --- | --- |
| email | <code>string</code> | The new email address. |
| userId | <code>string</code> | The ID of the user whose email is to be updated. |

<a name="updatePhone"></a>

## updatePhone(phone, userId) ⇒ <code>Promise.&lt;(Object\|boolean\|undefined)&gt;</code>
Update the phone number of the user with the given userId.

**Kind**: global function  
**Returns**: <code>Promise.&lt;(Object\|boolean\|undefined)&gt;</code> - Returns the result object, false if update fails, or undefined if parameters are invalid.  
**Throws**:

- <code>Error</code> In case of any error during phone update process.


| Param | Type | Description |
| --- | --- | --- |
| phone | <code>string</code> | The new phone number. |
| userId | <code>string</code> | The ID of the user whose phone number is to be updated. |

<a name="updateName"></a>

## updateName(name, userId) ⇒ <code>Promise.&lt;(Object\|boolean\|undefined)&gt;</code>
Update the name of the user with the given userId.

**Kind**: global function  
**Returns**: <code>Promise.&lt;(Object\|boolean\|undefined)&gt;</code> - Returns the result object, false if update fails, or undefined if parameters are invalid.  
**Throws**:

- <code>Error</code> In case of any error during name update process.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The new name. |
| userId | <code>string</code> | The ID of the user whose name is to be updated. |

<a name="updatePassword"></a>

## updatePassword(password, userId) ⇒ <code>Promise.&lt;(Object\|boolean\|undefined)&gt;</code>
Update the password of the user with the given userId.

**Kind**: global function  
**Returns**: <code>Promise.&lt;(Object\|boolean\|undefined)&gt;</code> - Returns the result object, false if update fails, or undefined if parameters are invalid.  
**Throws**:

- <code>Error</code> In case of any error during password update process.


| Param | Type | Description |
| --- | --- | --- |
| password | <code>string</code> | The new password. |
| userId | <code>string</code> | The ID of the user whose password is to be updated. |

<a name="SearchByQuery"></a>

## SearchByQuery(searchQuery, searchQueryType) ⇒ <code>Promise.&lt;(Array\|undefined)&gt;</code>
Search for users or contacts based on a query and query type. If no results are found in users, it searches in contacts. Additionally, it fetches the spam count for each found item.

**Kind**: global function  
**Returns**: <code>Promise.&lt;(Array\|undefined)&gt;</code> - Returns an array of search results with spam count or undefined if no results found.  
**Throws**:

- <code>Error</code> In case of any error during the search process.


| Param | Type | Description |
| --- | --- | --- |
| searchQuery | <code>string</code> | The search query to look for in the database. |
| searchQueryType | <code>string</code> | The type of query (e.g., 'name' or 'phone'). |

<a name="findSpamNumber"></a>

## findSpamNumber(phone, spammedById) ⇒ <code>Promise.&lt;(Object\|null\|undefined)&gt;</code>
Find a spam record for a specific phone number and user.

**Kind**: global function  
**Returns**: <code>Promise.&lt;(Object\|null\|undefined)&gt;</code> - Returns the spam record if found, null if not found, or undefined if parameters are invalid.  
**Throws**:

- <code>Error</code> In case of any error during the search for spam number.


| Param | Type | Description |
| --- | --- | --- |
| phone | <code>string</code> | The phone number to be checked. |
| spammedById | <code>string</code> | The ID of the user who marked the number as spam. |

<a name="markNumberSpam"></a>

## markNumberSpam(id, userId, phone) ⇒ <code>Promise.&lt;(Object\|null\|undefined)&gt;</code>
Mark a specific phone number as spam by a user.

**Kind**: global function  
**Returns**: <code>Promise.&lt;(Object\|null\|undefined)&gt;</code> - Returns the created spam record, null if creation fails, or undefined if parameters are invalid.  
**Throws**:

- <code>Error</code> In case of any error during the spam marking process.


| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The ID reference for the spam action. |
| userId | <code>string</code> | The ID of the user marking the number as spam. |
| phone | <code>string</code> | The phone number to be marked as spam. |

<a name="findRefreshToken"></a>

## findRefreshToken(refreshToken) ⇒ <code>object</code> \| <code>boolean</code> \| <code>undefined</code>
Find an existing refresh token by its value.

**Kind**: global function  
**Returns**: <code>object</code> \| <code>boolean</code> \| <code>undefined</code> - Returns the existing refresh token object, false if not found, or undefined if no token provided.  

| Param | Type | Description |
| --- | --- | --- |
| refreshToken | <code>string</code> | The refresh token value. |

<a name="findRefreshTokenById"></a>

## findRefreshTokenById(userId) ⇒ <code>object</code> \| <code>boolean</code> \| <code>undefined</code>
Find an existing refresh token by user ID.

**Kind**: global function  
**Returns**: <code>object</code> \| <code>boolean</code> \| <code>undefined</code> - Returns the existing refresh token object, false if not found, or undefined if no user ID provided.  

| Param | Type | Description |
| --- | --- | --- |
| userId | <code>string</code> | The ID of the user associated with the refresh token. |

<a name="updateRefreshToken"></a>

## updateRefreshToken(refreshToken, userId) ⇒ <code>number</code> \| <code>null</code> \| <code>undefined</code>
Update the status of a refresh token.

**Kind**: global function  
**Returns**: <code>number</code> \| <code>null</code> \| <code>undefined</code> - Returns the number of affected rows, null if update fails, or undefined if parameters are invalid.  

| Param | Type | Description |
| --- | --- | --- |
| refreshToken | <code>string</code> | The refresh token value. |
| userId | <code>string</code> | The ID of the user associated with the refresh token. |

<a name="deleteExistingRefreshTokens"></a>

## deleteExistingRefreshTokens(userId) ⇒ <code>number</code> \| <code>null</code> \| <code>undefined</code>
Delete all existing refresh tokens associated with a user.

**Kind**: global function  
**Returns**: <code>number</code> \| <code>null</code> \| <code>undefined</code> - Returns the number of deleted tokens, null if deletion fails, or undefined if no user ID provided.  

| Param | Type | Description |
| --- | --- | --- |
| userId | <code>string</code> | The ID of the user whose refresh tokens are to be deleted. |

<a name="decodeToken"></a>

## decodeToken(token) ⇒ <code>object</code> \| <code>null</code> \| <code>undefined</code>
Decode a JWT token to retrieve its payload.

**Kind**: global function  
**Returns**: <code>object</code> \| <code>null</code> \| <code>undefined</code> - Returns the decoded token payload, null if decoding fails, or undefined if no token provided.  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>string</code> | The JWT token to decode. |

<a name="storeRefreshToken"></a>

## storeRefreshToken(refreshToken, userId, userId_ref, expiresAt) ⇒ <code>object</code> \| <code>null</code> \| <code>undefined</code>
Store a new refresh token in the database.

**Kind**: global function  
**Returns**: <code>object</code> \| <code>null</code> \| <code>undefined</code> - Returns the stored refresh token object, null if storage fails, or undefined if parameters are invalid.  

| Param | Type | Description |
| --- | --- | --- |
| refreshToken | <code>string</code> | The refresh token value. |
| userId | <code>string</code> | The ID of the user associated with the refresh token. |
| userId_ref | <code>string</code> | The reference user ID. |
| expiresAt | <code>Date</code> | The expiration date of the token. |

