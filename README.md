**Simple Node Restify Example REST API**
----
An example using node-restify to build a REST API service which serves time data for different time zones with a FireBase backend. It includes some basic CRUD operations (GET, POST, DELETE), as well as retrieving and converting time objects to your desired time zone.
----

Create (or update if it already exists) a new instance of a Time object with either a given UTC time, or the current time.

* **URL**

  time/set/<\id>/<?UTCtime>

* **Method:**
  
  `POST`
  
*  **URL Params**

  `id` - (required) this is the unique identifier for the "Time"
  
  `UTCtime` - (optional) this is an optional UTC Date/Time string that is to be stored

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 'Success: Created entry <\id> with time = <\time>'
 
* **Error Response:**


  * **Code:** 400 Bad Request <br />
    **Content:** 'Error: Please provide a valid ID.'
    

Retrive an instance of a Time object by its ID and convert it to your desired time zone. Here are some sample time zones that are supported (https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). NOTE: If there is a time zones in the fomat "PLACE1/PLACE2", they will be entered as two different parameters with the slash, i.e. time/set/<\ID>/America/Louisville.

* **Method:**
  
  `GET`
  
*  **URL Params**

  `id` - the unique identifier for the "Time"
  
  `zone` - gets the "Time" but converted into the appropriate timezone

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** '{id: <\id>, time: <converted_time>}'
 
* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:** 'Error: Invalid Time Zone Provided.'
    
  OR
  
  * **Code:** 400 Bad Request <br />
    **Content:** "Error: ID not found."

Delete a given instance of a Time object by its ID

/time/delete/<id>
 `id` - deletes the "Time" identified by this id
 
 * **Method:**
  
  `DEL`
  
*  **URL Params**

  `id` - deletes the "Time" identified by this id
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 'Success: Time object id <\id> was removed.'
 
* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:** 'Error: Entry does not exist.'
  
  OR
  
  * **Code:** 400 Bad Request <br />
    **Content:** 'Error: Please provide a valid ID.'  
  
    
  OR
  
  * **Code:** 400 Bad Request <br />
    **Content:** "Error: ID not found."
