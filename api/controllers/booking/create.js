module.exports = {


  friendlyName: 'Create',


  description: 'Create booking.',


  inputs: {
    user: {
      type: 'number',
      required: true
    },

    startTimestamp: {
      type: 'number',
      required: true
    },

    endTimestamp: {
      type: 'number',
      required: true
    },

    room: {
      type: 'string',
      required: true
    }
  },


  exits: {
    success: {
      outputDescription: 'The newly created `Booking`.',
      outputExample: {}
    },
    alreadyBooked: {
      description: 'The desired slot is already booked.',
      responseType: 'alreadyBooked'
    }
  },


  fn: async function (inputs, exits) {

    const alreadyBooked = await Booking.find({
      where: { 
        startTimestamp: { '<': inputs.endTimestamp },
        endTimestamp: { '>': inputs.startTimestamp },
        room: inputs.room
      }
    });

    if (alreadyBooked.length > 0) { return exits.alreadyBooked('The desired slot is already booked.'); }

    const booking = await Booking.create({
      user: inputs.user,
      startTimestamp: inputs.startTimestamp,
      endTimestamp: inputs.endTimestamp,
      room: inputs.room
    }).fetch();

    return exits.success(booking);

  }

};
