/**
 * @swagger
 *  tags:
 *   name: auth
 *   description : auth mobile and routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          sendOtp:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 *          checkOtp:
 *              type: object
 *              required:
 *                  -   mobile
 *                  -   code
 *              properties:
 *                  mobile:
 *                      type: string
 *                  code:
 *                      type: string
 *
 */

/**
 * @swagger
 * /auth/send-otp:
 *  post:
 *       summary: login with otp
 *       tags:
 *           -   auth
 *       requestBody:
 *           content:
 *               application/x-www-form-urlencoded:
 *                   schema:
 *                       $ref: '#/components/schemas/sendOtp'
 *               application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/sendOtp'
 *       responses:
 *           200:
 *               description: success
 */
/**
 * @swagger
 * /auth/check-otp:
 *  post:
 *       summary: check otp
 *       tags:
 *           -   auth
 *       requestBody:
 *           content:
 *               application/x-www-form-urlencoded:
 *                   schema:
 *                       $ref: '#/components/schemas/checkOtp'
 *               application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/checkOtp'
 *       responses:
 *           200:
 *               description: success
 *
*/

/**
 * @swagger
 * /auth/check-otp:
 *  post:
 *       summary: check otp
 *       tags:
 *           -   auth
 *       requestBody:
 *           content:
 *               application/x-www-form-urlencoded:
 *                   schema:
 *                       $ref: '#/components/schemas/checkOtp'
 *               application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/checkOtp'
 *       responses:
 *           200:
 *               description: success
 */


/**
 * @swagger
 * /auth/logout:
 *  get:
 *       summary: logout user
 *       tags:
 *           -   auth
 *       responses:
 *           200:
 *               description: success
 */

