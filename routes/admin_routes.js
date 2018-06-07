let routes = require('express').Router()
let auth = require('../controller/admin_controller')

/**
 * Edit an existing user
 * @route PUT /admin/edituser
 * @group Admin
 * @param {string} userID.required - The users ID
 * @param {string} username.required - Username
 * @param {string} password.required - Password
 * @param {string} imei.required - The users GUID
 * @param {string} firstname.required - The users name
 * @param {string} lastname.required - The users lastname
 * @return {ApiResponse.model} 200 - Edit succesfull
 * @return {ApiResponse.model} 412 - Missing parameters, check if userId, username, password, imei, firstname or lastname is missing
 * @return {ApiResponse.model} 500 - Unexpected error
 */
routes.put('/edituser', auth.editUser)

/**
 * Delete a user
 * @route DELETE /admin/deleteuser
 * @group Admin
 * @param {string} userID.required - The users ID
 * @param {string} username.required - Username
 * @return {ApiResponse.model} 412 - Missing parameters, check if userID is missing
 * @return {ApiResponse.model} 200 - Succesfully deleted user
 * @return {ApiResponse.model} 500 - Unexpected error
 */
routes.delete('/deleteuser', auth.deleteUser)

/**
 * Edits a driver (part of user)
 * @route PUT /admin/editdriver
 * @group Admin
 * @param {string} userID.required - The users ID
 * @param {string} firstname.required - New or old firstnem
 * @param {string} lastname.required - New or old lastname
 * @return {ApiResponse.model} 412 - Missing parameters, check if userID, firstname or lastname is missing
 * @return {ApiResponse.model} 412 - No user found with this ID
 * @return {ApiResponse.model} 200 - Edit succesfull
 * @return {ApiResponse.model} 500 - Unexpected error
 */
routes.put('/editdriver', auth.editDriver)

/**
 * Edits a users GUID
 * @route PUT /admin/editimei
 * @group Admin
 * @param {string} userID.required - The users ID
 * @param {string} imei.required - The users GUID
 * @return {ApiResponse.model} 412 - Missing parameters, check if userID or imei is missing
 * @return {ApiResponse.model} 200 - Edit succesfull
 * @return {ApiResponse.model} 500 - Unexpected error
 */
routes.put('/editimei', auth.editImei)

/**
 * Returns a join of users and drivers
 * @route GET /admin/allusers
 * @group Admin
 * @return {ApiResponse.model} 200 - []
 * @return {ApiResponse.model} 500 - Unexpected error
 */
routes.get('/allusers', auth.getAllUsers)

module.exports = routes