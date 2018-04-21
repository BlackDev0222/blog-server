// node_modules
const QueryBuilder = require("node-querybuilder");

// config
const { DATABASE_CONFIG } = require("../config");
function MYSQL(config) {
    this.queryBuilder = new QueryBuilder(config, "mysql", "pool");
    this.connection = undefined;
}

MYSQL.prototype.getConnection = async function () {
    try {
        if (!this.connection) {
            this.connection = await this.queryBuilder.get_connection();
        }

        this.connection._connection.on("error", (error) => {
            if (error.code === "PROTOCOL_CONNECTION_LOST") {
                this.connection = undefined;
            }
        });
    } catch (error) {
        console.log(error);
    }

    return this.connection;
};

module.exports = new MYSQL(DATABASE_CONFIG);
