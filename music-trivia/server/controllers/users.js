const users = [];
let id = 0;

module.exports = {
    getUsers: (req, res) => {
        return res.status(200).json(users);
    },
    createUser: ( req, res ) => {
        id++;
        req.body.id = id;
        users.push( req.body );
        return res.status(200).json(users);
    },
    updateUser: ( req, res ) => {
        for ( let i = 0; i < users.length; i++ ) {
            if ( users[i].id === Number(req.params.id) ) {
                users[i] = req.body;
                console.log( users[i] );
            }
        }
        return res.status(200).json(users);
    }
}