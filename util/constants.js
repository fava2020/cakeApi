function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true
    });
}

define('ERROR_404_NOT_FOUND', 'Page not found');
define('DATA_VALIDATION_FAILED', 'Validation failed, entered data is incorrect.');
define('DATA_NOT_FOUND', 'Could not find cake!');
define('DATA_UPDATEP', 'Cake updated!');
define('DATA_DELETED', 'Cake deleted!');

define('STATUS_CODE_NOT_FOUND', 404);
define('STATUS_CODE_INTERNAL_SERVER_ERROR', 500);
define('STATUS_CODE_UNPROCESSABLE_ENTITY', 422);
define('STATUS_CODE_OK', 200);
define('STATUS_CODE_CREATED', 201);
define('URI_DB', 'mongodb://127.0.0.1:27017/cake');
define('PORT', 3000);