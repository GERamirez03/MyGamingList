const { BadRequestError } = require("../expressError");

/** Helper function that generates the SET clause of an UPDATE SQL query
 *  to be used with the partial update functionality for user profiles.
 * 
 *  Reads the keys of dataToUpdate, an object containing the column-value 
 *  pairs of data to update, to generate the necessary SQL.
 * 
 *  Uses jsToSql object to translate JS object properties into SQL column names.
 * 
 *  Returns { setCols, values } where:
 * 
 *  setCols is the concatenated string of all the columns to update
 *    with parameterized inputs (e.g. "first_name=$1, age=$2"),
 * 
 *  and values is an array of all of the values to set those columns to
 *    (e.g. ["Aliya", 32])
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };