import { beforeAll, beforeEach, afterEach, afterAll, expect, test } from 'vitest';
import mongoose from 'mongoose';
const dotenv = require('dotenv').config({ path: __dirname + '/.env' });
const dbm = require("../db/index.js");
/**
 * Executed once before all tests are performed.
 */
beforeAll(async () => {
});

/**
 * Executed before each test is performed.
 */
beforeEach(() => {
});

/**
 * Executed after each test is performed.
 */
afterEach(() => {
});

/**
 * Executed once after all tests are performed.
 */
afterAll( () => {
    //I gotta restart the database every time, JIC
    console.log("run startup script");
});

let createdUser = null;
let createdPlaylist = null; 
test('Test #1) Create User', async () => {
    const testUser = {
        firstName: 'Test',
        lastName: 'User',
        email: 'abc@ab.com',
        passwordHash: 'asdfbajsdkfadfbshijdfnbwrf',
    };

    createdUser = await dbm.createUser(testUser);
    //expect structure not working use this
    expect(createdUser.email).toBe(testUser.email);
});

test('Test #2) Read User', async () => {
    const user = await dbm.findUser('abc@ab.com');
    expect(user.firstName).toBe('Test');
});

test('Test #3) Create Playlist', async () => {
    const testPlaylist = {
        _id:'123456789012345678901234',
        name: 'Test Playlist',
        songs: [],
        ownerEmail: 'abc@ab.com'
    };

    createdPlaylist = await dbm.createPlaylist(testPlaylist, createdUser._id);
    expect(createdPlaylist.name).toBe('Test Playlist');
});

test('Test #4) Read Playlist', async () => {
    const playlist = await dbm.getPlaylist(createdPlaylist._id);
    expect(playlist.name).toBe('Test Playlist');
});

test('Test #5) Update Playlist', async () => {
    const updatedData = {
        playlist: {
            name: 'Updated Playlist',
            songs: [{ title: 'New Song' }]
        }
    };

    const result = await dbm.replacePlaylist(createdPlaylist._id, updatedData);
    expect(result).toBe(true);

    const updated = await dbm.getPlaylist(createdPlaylist._id);
    expect(updated.name).toBe('Updated Playlist');
});

test('Test #6) Delete Playlist', async () => {
    const deleted = await dbm.deletePlaylist(createdPlaylist._id);
    expect(deleted).toBe(true);

    const afterDelete = await dbm.getPlaylist(createdPlaylist._id);
    expect(afterDelete).toBeNull();
});
