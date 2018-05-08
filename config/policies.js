/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  BookingController: {
    'create': true,
    'find': true,
    'findOne': true,
    '*': false
  },

  RoomController: {
    'find': true,
    'findOne': true,
    'search': true,
    '*': false
  }

};
