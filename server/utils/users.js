[
  {
    id: "aoiyq8oaefih",
    name: "Andrew",
    room: "lsfhso"
  }
];

class Users {
  constructor() {
    this.users = [];
  }
  userExists(name, room) {
    var users = this.users.filter(
      user =>
        user.room === room && user.name.toUpperCase() === name.toUpperCase()
    );
    if (users.length > 0) {
      return false;
    } else {
      return true;
    }
  }
  addUser(id, name, room) {
    var user = { id, name, room };
    this.users.push(user);
    return user;
  }
  removeUser(id) {
    var user = this.getUser(id);
    if (user) {
      this.users = this.users.filter(user => user.id !== id);
    }
    return user;
  }
  getUser(id) {
    return this.users.filter(user => user.id === id)[0];
  }
  getUserList(room) {
    var users = this.users.filter(user => user.room === room);
    var namesArray = users.map(user => user.name);
    return namesArray;
  }
}

module.exports = { Users };
