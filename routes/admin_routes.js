let routes = require('express').Router()
let auth = require('../controller/admin_controller')

/**
 * Edit an existing user
 * @route POST /admin/edituser
 * @group Admin
 * @param {string} userID.required - The users ID
 * @param {string} username.required - Username
 * @param {string} password.required - Password
 * @param {string} imei.required - The users GUID
 * @param {string} firstname.required - The users name
 * @param {string} lastname.required - The users lastname
 * @returns {object}  500 - Unexpected error
 */
routes.put('/edituser', auth.editUser)

/**
 * Delete a user
 * @route POST /admin/deleteuser
 * @group Admin
 * @param {string} userID.required - The users ID
 * @param {string} username.required - Username
 * @return {object} 412 - Please provide an userID
 * @return {object} 200 - Succesfully delete user
 * @returns {object}  500 - Unexpected error
 */
routes.delete('/deleteuser', auth.deleteUser)

/**
 * Edits a driver (part of user)
 * @route POST /admin/editdriver
 * @group Admin
 * @param {string} userID.required - The users ID
 * @param {string} firstname.required - New or old firstnem
 * @param {string} lastname.required - New or old lastname
 * @return {object} 412 - No parameters
 * @return {object} 404 - No user found with this ID
 * @return {object} 200 - Edit succesfull
 * @returns {object}  500 - Unexpected error
 */
routes.put('/editdriver', auth.editDriver)
routes.put('/editimei', auth.editImei)
routes.get('/allusers', auth.getAllUsers)

module.exports = routes