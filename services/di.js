let dependencies = {};

const add = (name, obj) => dependencies[name] = obj;

const get = name => dependencies[name] || null;

module.exports = {
    services: () => Object.assign({}, dependencies),
    add: add,
    get: get,
}