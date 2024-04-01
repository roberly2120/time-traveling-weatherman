- this app will take time and location from a user, then create an image of what that day in history might have looked like in this location.
- Dall-e for image creation
- APIs like the Met Office Weather DataHub or Visual Crossing Weather offer historical weather data.
- the whole thing should look like a local weather channel and have a scrolling headline bar at the bottom offering headlines relevant to that time and place. for this i will use either the NY times archive api, or the Event Registry API. 


start with making the get-weather selectable by city, month, year, and time of day. 
once those are selectable, set state with these data

error handling 
    if there is missing weather data, tell the user that weather data did not exist for this instance so it will not be reflected in the results

[ ] add loading spinner to weatherman container when isLoading && !currentImage
[ ] add scrolling headlines when they exist
[ ] create a way to select and view previous data. probably a drawer for this