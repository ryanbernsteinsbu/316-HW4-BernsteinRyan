const PlaylistModel = require("../../models/mongodb/playlist-model");
const UserModel = require("../../models/mongodb/user-model");
const DatabaseManager = require("../DatabaseManager.js")
class MongoDBM extends DatabaseManager{
    constructor(connection, UserModel, PlaylistModel){
        super(connection, UserModel, PlaylistModel);
    }
    createPlaylist(body, userId) {
        async function doCreatePlaylist(){
            try {
                const playlist = new PlaylistModel(body);

                const user = await UserModel.findById(userId);
                if (!user) throw new Error("User not found");

                user.playlists.push(playlist._id);
                await user.save();
                await playlist.save();

                return playlist;
            } catch (err) {
                console.error("Error creating playlist:", err.message);
                return null;
            }
        }
        return doCreatePlaylist();
    }
    deletePlaylist(id) {
        async function doDelete() {
            try {
                const deleted = await PlaylistModel.findByIdAndDelete(id);
                return !!deleted; //convert to boolean
            } catch (err) {
                console.error("Error deleting playlist:", err.message);
                return false;
            }
        }
        return doDelete();
    }    
   replacePlaylist(id, body) {
        async function doReplace() {
            try {
                const list = await PlaylistModel.findById(id);
                if (!list) return false;

                list.name = body.playlist.name;
                list.songs = body.playlist.songs;
                await list.save();
                return true;
            } catch (err) {
                console.error("Error replacing playlist:", err.message);
                return false;
            }
        }
        return doReplace();
    }    
    getPlaylistPairs(email) {
        async function doGetPairs() {
            try {
                const playlists = await PlaylistModel.find({ ownerEmail: email });
                if (!playlists || !playlists.length){
                    return [];
                }
                let pairs = [];
                for (let key in playlists) {
                    let list = playlists[key];
                    let pair = {
                        _id: list._id,
                        name: list.name
                    };
                    pairs.push(pair);
                }
                return pairs;

            } catch (err) {
                console.error("Error getting playlist pairs:", err.message);
                return [];
            }
        }
        return doGetPairs();
    }
    getPlaylist(id) {
        async function doGetPlaylist() {
            try {
                const playlist = await PlaylistModel.findById(id);
                if(playlist){
                    return playlist;
                } else {
                    return null;
                }
            } catch (err) {
                console.error("Error getting playlist:", err.message);
                return null;
            }
        }
        return doGetPlaylist();
    }        
    getPlaylists(){
        async function doGetPlaylists() {
            try {
                const playlists = await PlaylistModel.find({});
                if(playlists){
                    return playlists;
                } else {
                    return null;
                }
            } catch (err) {
                console.error("Error getting playlist:", err.message);
                return null;
            }
        }
        return doGetPlaylists();
    }
    createUser(body) {
        async function doCreateUser() {
            try {
                const newUser = new UserModel(body);
                await newUser.save();
                return newUser;
            } catch (err) {
                console.error("Error creating user:", err.message);
                return null;
            }
        }
        return doCreateUser();
    }
    getUser(id) {
        async function doGetUser() {
            try {
                const user = await UserModel.findById(id);
                if(user){
                    return user;
                } else {
                    return null;
                }
            } catch (err) {
                console.error("Error getting user:", err.message);
                return null;
            }
        }
        return doGetUser();
    }
    findUser(email) {
        async function doFindUser() {
            try {
                const user = await UserModel.findOne({ email });
                if(user){
                    return user;
                } else {
                    return null;
                }
            } catch (err) {
                console.error("Error finding user:", err.message);
                return null;
            }
        }
        return doFindUser();
    }
    asyncFindUser(list) {
        async function doAsyncFindUser() {
            try {
                const user = await UserModel.findOne({ email: list.ownerEmail });
                if(user){
                    return user;
                } else {
                    return null;
                }
            } catch (err) {
                console.error("Error async finding user:", err.message);
                return null;
            }
        }
        return doAsyncFindUser();
    }
}

module.exports = MongoDBM;
