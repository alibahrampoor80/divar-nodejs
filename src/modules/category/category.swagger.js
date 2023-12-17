/**
 * @swagger
 *  tags:
 *   name: category
 *   description : category module
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          createCategory:
 *              type: object
 *              required:
 *                  -   name
 *                  -   icon
 *              properties:
 *                  name:
 *                      type: string
 *                  slug:
 *                      type: string
 *                  icon:
 *                      type: string
 *                  parent:
 *                      type: string
 *
 */

/**
 * @swagger
 *  /category/create:
 *   post:
 *      summary: create new category
 *      tags:
 *          -   category
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/createCategory'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/createCategory'
 *      responses:
 *              201:
 *                 description: created
 *
 */

/**
 * @swagger
 *  /category/get-all:
 *   get:
 *      summary: get all category
 *      tags:
 *          -   category
 *      responses:
 *          200:
 *             description: successfully
 *
 */