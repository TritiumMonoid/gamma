const localforage = require("localforage");
const uuidv1 = require("uuid/v1");

function configureDatabase() {
  localforage.config({
    name: "gamma_db",
    version: 1.0,
    storeName: "gamma_db"
  });
}

function addSet(set) {
  return localforage.addItem(uuidv1(), set);
}

function getSet(id) {
  return localforage.getItem(id);
}

function removeSet(id) {
  return localforage.removeItem(id);
}

function clearSets() {
  return localforage.clear();
}

function iterateSets(callback) {
  return localforage.iterate(callback);
}

module.exports = {
  configureDatabase,
  addSet,
  getSet,
  removeSet,
  clearSets,
  iterateSets
};
