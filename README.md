# HTTP-module-assignment

1. Create a server that is going to be listening requests on port 9000
2. Your Node App should be able to store a number in the path /myNumber. Use body payload to send the value: { myNumber: 123 }. Don't create one number per request, just create or update the current number.
3. You can see the value number with a request to /myNumber
4. If you receive a request from path /myNumber/{multiplier}, you should return in the response the value: myNumber*multiplier. If there is no current value for myNumber, return 400 error.
5. Delete the current value with a request to /reset.
6. If you try to use a non-numeric value to create/update myNumber, a 400 error should be returned.
7. If there is no value stored, a 404 should be returned.
8. Any other request should be handled with an error code 404, "resource not found"
