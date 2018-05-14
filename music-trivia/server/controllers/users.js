const users = [];
let id = 0;

module.exports = {
    getUsers: (req, res) => {
        console.log(users);
        return res.status(200).json(users);
    },
    getUserById: (req, res) => {
        let selectedUser;
        for ( let i = 0; i < users.length; i++ ) {
            if ( users[i].id === Number(req.params.id) ) {
                selectedUser = users[i];
            }
        }
        console.log( 'Selected user: ', selectedUser );
        return res.status(200).json(selectedUser);
    },
    createUser: ( req, res ) => {
        id++;
        req.body.id = id;
        users.push( req.body );
        console.log( 'New user created: ', users);
        return res.status(200).json(users);
    },
    updateUser: ( req, res ) => {
        for ( let i = 0; i < users.length; i++ ) {
            if ( users[i].id === Number(req.params.id) ) {
                users[i] = req.body;
                console.log( `${users[i].username} was updated: `, users[i] );
            }
        }
        return res.status(200).json(users);
    },
    deleteUser: ( req, res ) => {
        for ( let i = users.length - 1; i >= 0; i-- ) {
            if ( users[i].id === Number(req.params.id) ) {
                users.splice(i, 1);
                console.log( users[i] );
                console.log( `${users[i]}.username was deleted.` );
            }
        }
        return res.status(200).json(users);
    }
}