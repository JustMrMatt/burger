var connection = require("../config/connection.js");

function printQuestionMarks(num) {
	var arr = [];

	for (var i = 0; i < num; i++) {
		arr.push("?");
	}
	return arr.toString();
}

function objToSql(ob) {
	var arr = [];

	for (var key in ob) {
		arr.push(key + "=" + ob[key]);
	}
	return arr.toString();
}

var orm = {
    selectAll: function(table, callback) {
        var query = "SELECT * FROM " + table + ";";

        connection.query(query, function(err, res) {
            if (err) {
                throw err;
            }
            callback(res);
        });
    },

    insertOne: function(table, cols, vals, callback) {
        var query = "INSERT INTO " + table + " (" + cols.toString() + ") " + "VALUES (" + printQuestionMarks(vals.length) + ") ";
        connection.query(query, vals, function(err, res) {
            if (err) {
                throw err;
            }
            callback(res);
        });
    },

    updateOne: function(table, objColVals, condition, callback) {
        var query = "UPDATE " + table +  " SET " + objToSql(objColVals) + " WHERE " + condition;
        connection.query(query, function(err, res) {
            if (err) {
                throw err;
            }
            callback(res);
        });
    },

    deleteOne: function(table, condition, callback) {
        var query = "DELETE FROM " + table + " WHERE " + condition;
        connection.query(query, function(err, res) {
            if (err) {
                throw err;
            }
            callback(res);
        });
    }
};

module.exports = orm;