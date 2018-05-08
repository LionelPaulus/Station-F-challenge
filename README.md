# Station F challenge > meeting rooms manager

A [Sails v1](https://sailsjs.com) application.

## Installation
```ssh
npm install
sails lift
```

## API routes
Route | Method | Description
-- | -- | --
/api/rooms | GET | Get all the rooms
/api/rooms/:roomId | GET | Get details about a specific room
/api/search/rooms/?startTimestamp=:startTimestamp&endTimestamp=:endTimestamp | GET | Search available rooms between a date interval
/api/bookings/ | POST | Add a booking
/api/bookings/ | GET | List all bookings
/api/bookings/:bookingId | GET | Get details about a specific booking

## Security
- [x] The API for adding reservations checks if the desired slot is effectively free or not.
- [x] You can't add or edit a meeting room.
- [x] You can't edit a booking.
- [x] API input paramaters are checked to avoid breaking the server.

## Suggestions for improvement
- [ ] Simplify the data range inputs: maybe 1 date input and 2 time inputs. But Station F is open all night long so maybe we should be able to book a room over two days...
- [ ] Cache requests to the API.
- [ ] Use history.pushState to update URL with the selected data range (can be useful for sharing the page).