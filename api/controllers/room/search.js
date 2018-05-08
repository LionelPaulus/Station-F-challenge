/**
 * Module dependencies
 */

// ...


/**
 * room/search.js
 *
 * Search room.
 */
module.exports = async function search(req, res) {

  if ((!req.param('startTimestamp')) || (!req.param('endTimestamp'))) {
    return res.badRequest(
      'Missing parameter(s) startTimestamp or/and endTimestamp.'
    );
  }

  if ((isNaN(req.param('startTimestamp'))) || (isNaN(req.param('endTimestamp')))) {
    return res.badRequest(
      'NaN startTimestamp or/and endTimestamp.'
    );
  }
  
  const bookings = await Booking.find({
    where: { 
      startTimestamp: { '<': req.param('endTimestamp')},
      endTimestamp: { '>': req.param('startTimestamp') }
    }
  });

  const bookedRooms = [];
  bookings.forEach(booking => {
    bookedRooms.push(booking.room);
  });

  const availableRooms = await Room.find({
    where: { 
      id: { '!=' : bookedRooms }
    }
  });

  return res.json(availableRooms);

};
