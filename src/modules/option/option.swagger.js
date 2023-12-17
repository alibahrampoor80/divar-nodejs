/**
 * @swagger
 *  tags:
 *   name: option
 *   description : option module
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          createOption:
 *              type: object
 *              required:
 *                  -   title
 *                  -   key
 *                  -   type
 *                  -   category
 *              properties:
 *                  title:
 *                      type: string
 *                  key:
 *                      type: string
 *                  category:
 *                      type: string
 *                  guid:
 *                      type: string
 *                  type:
 *                      type: string
 *                      enum:
 *                          -   number
 *                          -   string
 *                          -   array
 *                          -   boolean
 *                  enum:
 *                       type: array
 *                       items:
 *                           type: string
 *
 */

/**
 * @swagger
 *  /option/create:
 *   post:
 *      summary: create new option
 *      tags:
 *          -   option
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/createOption'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/createOption'
 *      responses:
 *              201:
 *                 description: created
 *
 */

/**
 * @swagger
 *  /option/{categoryId}:
 *   get:
 *      summary: get all option
 *      tags:
 *          -   option
 *      parameters:
 *          -    in: path
 *               name: categoryId
 *               type: string
 *      responses:
 *          200:
 *             description: successfully
 *
 */
/**
 * @swagger
 *  /option/by-category/{categoryId}:
 *   get:
 *      summary: get all option
 *      tags:
 *          -   option
 *      parameters:
 *          -    in: path
 *               name: categoryId
 *               type: string
 *      responses:
 *          200:
 *             description: successfully
 *
 */
/**
 * @swagger
 *  /option/{id}:
 *   get:
 *      summary: get option by id
 *      tags:
 *          -   option
 *      parameters:
 *          -    in: path
 *               name: id
 *               type: string
 *      responses:
 *          200:
 *             description: successfully
 *
 */
/**
 * @swagger
 *  /option/get-all:
 *   get:
 *      summary: get all option
 *      tags:
 *          -   option
 *      responses:
 *          200:
 *             description: successfully
 *
 */
